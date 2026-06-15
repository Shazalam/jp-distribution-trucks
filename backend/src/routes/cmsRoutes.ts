import express from 'express';
import { uploadMiddleware } from '../utils/cloudinary';
import Truck from '../models/Truck';
import ContentVersion from '../models/ContentVersion';
import AuditLog from '../models/AuditLog';

const router = express.Router();

// Middleware placeholder for Auth (assume admin is authenticated)
// router.use(protectAdmin); 

/**
 * =====================================
 * MEDIA UPLOADS
 * =====================================
 */
router.post('/media/upload', uploadMiddleware.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    // req.file contains the Cloudinary URL and details automatically via Multer
    res.status(200).json({
      success: true,
      url: req.file.path,
      message: 'Media uploaded successfully to Cloudinary'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Media upload failed', error });
  }
});

/**
 * =====================================
 * TRUCK CMS
 * =====================================
 */

// GET ALL TRUCKS (Admin View / Public View)
router.get('/trucks', async (req, res) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const trucks = await Truck.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: trucks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// CREATE NEW TRUCK
router.post('/trucks', async (req, res) => {
  try {
    const truck = new Truck({
      ...req.body,
      status: req.body.status || 'Draft',
    });
    
    await truck.save();
    
    // Log Audit
    await AuditLog.create({
      action: 'CREATE',
      entityType: 'Truck',
      entityId: truck._id,
      newValue: truck,
      adminId: req.body.adminId || '60d0fe4f5311236168a109ca', // Dummy ID until auth is fully hooked
      details: 'Created new truck draft'
    });

    res.status(201).json({ success: true, data: truck });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create truck', error });
  }
});

// UPDATE AND PUBLISH TRUCK (Versioning Logic)
router.put('/trucks/:id', async (req, res) => {
  try {
    const oldTruck = await Truck.findById(req.params.id);
    if (!oldTruck) return res.status(404).json({ success: false, message: 'Truck not found' });

    // If the status is changing to 'Published' OR they are updating an already Published truck, 
    // we must create a Version Snapshot of the OLD state before overwriting it.
    if (req.body.status === 'Published' || oldTruck.status === 'Published') {
      await ContentVersion.create({
        entityId: oldTruck._id,
        entityModel: 'Truck',
        snapshotData: oldTruck.toObject(),
        changedBy: req.body.adminId || '60d0fe4f5311236168a109ca',
        changeNotes: req.body.changeNotes || 'Content updated'
      });
    }

    const updatedTruck = await Truck.findByIdAndUpdate(
      req.params.id, 
      { 
        ...req.body,
        lastEditedBy: req.body.adminId,
        publishedAt: req.body.status === 'Published' ? new Date() : oldTruck.publishedAt
      }, 
      { new: true }
    );

    await AuditLog.create({
      action: req.body.status === 'Published' ? 'PUBLISH' : 'UPDATE',
      entityType: 'Truck',
      entityId: updatedTruck?._id,
      oldValue: oldTruck,
      newValue: updatedTruck,
      adminId: req.body.adminId || '60d0fe4f5311236168a109ca'
    });

    // Trigger Frontend Revalidation Webhook
    try {
      await fetch('http://localhost:3000/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: 'trucks', path: '/trucks' })
      });
    } catch(e) { console.error('Failed to trigger revalidation'); }

    res.json({ success: true, data: updatedTruck });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Update failed', error });
  }
});

/**
 * =====================================
 * VERSION RESTORATION
 * =====================================
 */

// GET VERSIONS FOR ENTITY
router.get('/versions/:model/:id', async (req, res) => {
  try {
    const versions = await ContentVersion.find({ 
      entityModel: req.params.model, 
      entityId: req.params.id 
    }).sort({ createdAt: -1 });
    res.json({ success: true, data: versions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch versions' });
  }
});

// RESTORE PREVIOUS VERSION
router.post('/revert/:versionId', async (req, res) => {
  try {
    const version = await ContentVersion.findById(req.params.versionId);
    if (!version) return res.status(404).json({ success: false, message: 'Version not found' });

    let restoredDoc;
    if (version.entityModel === 'Truck') {
      restoredDoc = await Truck.findByIdAndUpdate(version.entityId, version.snapshotData, { new: true });
    }

    await AuditLog.create({
      action: 'REVERT',
      entityType: version.entityModel,
      entityId: version.entityId,
      oldValue: null,
      newValue: restoredDoc,
      adminId: req.body.adminId || '60d0fe4f5311236168a109ca',
      details: `Reverted to version from ${version.createdAt}`
    });

    // Trigger Frontend Revalidation Webhook
    try {
      await fetch('http://localhost:3000/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: 'trucks', path: '/trucks' })
      });
    } catch(e) { console.error('Failed to trigger revalidation'); }

    res.json({ success: true, message: 'Version restored successfully', data: restoredDoc });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to restore version' });
  }
});

export default router;
