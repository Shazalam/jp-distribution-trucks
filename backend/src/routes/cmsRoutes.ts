import express from 'express';
import { uploadMiddleware } from '../utils/cloudinary';
import Truck from '../models/Truck';
import Part from '../models/Part';
import ContentVersion from '../models/ContentVersion';
import AuditLog from '../models/AuditLog';
import PageConfig from '../models/PageConfig';

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
    res.status(500).json({ success: false, message: 'Media upload failed', error: error instanceof Error ? error.message : String(error) });
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
    const statusQuery = req.query.status as "Draft" | "Published" | "Archived" | undefined;
    const typeQuery = req.query.type as string | undefined;
    
    const filter: any = {};
    if (statusQuery) filter.status = statusQuery;
    if (typeQuery) filter.type = typeQuery;

    const trucks = await Truck.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: trucks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error instanceof Error ? error.message : String(error) });
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
    res.status(400).json({ success: false, message: 'Failed to create truck', error: error instanceof Error ? error.message : String(error) });
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
    res.status(400).json({ success: false, message: 'Update failed', error: error instanceof Error ? error.message : String(error) });
  }
});

// DELETE TRUCK
router.delete('/trucks/:id', async (req, res) => {
  try {
    const truck = await Truck.findById(req.params.id);
    if (!truck) return res.status(404).json({ success: false, message: 'Truck not found' });

    await Truck.findByIdAndDelete(req.params.id);

    await AuditLog.create({
      action: 'DELETE',
      entityType: 'Truck',
      entityId: truck._id,
      oldValue: truck,
      adminId: '60d0fe4f5311236168a109ca',
      details: `Deleted truck: ${truck.title}`
    });

    // Trigger Frontend Revalidation
    try {
      await fetch('http://localhost:3000/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: 'trucks', path: '/trucks' })
      });
    } catch(e) { console.error('Failed to trigger revalidation'); }

    res.json({ success: true, message: 'Truck deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Delete failed', error: error instanceof Error ? error.message : String(error) });
  }
});

/**
 * =====================================
 * PARTS CMS
 * =====================================
 */

// GET ALL PARTS
router.get('/parts', async (req, res) => {
  try {
    const statusQuery = req.query.status as "Draft" | "Published" | "Archived" | undefined;
    const category = req.query.category as string | undefined;
    const subcategory = req.query.subcategory as string | undefined;
    const filter: any = {};
    if (statusQuery) filter.status = statusQuery;
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    const parts = await Part.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: parts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error instanceof Error ? error.message : String(error) });
  }
});

// CREATE NEW PART
router.post('/parts', async (req, res) => {
  try {
    const part = new Part({
      ...req.body,
      status: req.body.status || 'Draft',
    });
    
    await part.save();
    
    await AuditLog.create({
      action: 'CREATE',
      entityType: 'Part',
      entityId: part._id,
      newValue: part,
      adminId: req.body.adminId || '60d0fe4f5311236168a109ca',
      details: 'Created new part draft'
    });

    res.status(201).json({ success: true, data: part });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create part', error: error instanceof Error ? error.message : String(error) });
  }
});

// UPDATE AND PUBLISH PART
router.put('/parts/:id', async (req, res) => {
  try {
    const oldPart = await Part.findById(req.params.id);
    if (!oldPart) return res.status(404).json({ success: false, message: 'Part not found' });

    if (req.body.status === 'Published' || oldPart.status === 'Published') {
      await ContentVersion.create({
        entityId: oldPart._id,
        entityModel: 'Part',
        snapshotData: oldPart.toObject(),
        changedBy: req.body.adminId || '60d0fe4f5311236168a109ca',
        changeNotes: req.body.changeNotes || 'Content updated'
      });
    }

    const updatedPart = await Part.findByIdAndUpdate(
      req.params.id, 
      { 
        ...req.body,
        lastEditedBy: req.body.adminId,
        publishedAt: req.body.status === 'Published' ? new Date() : oldPart.publishedAt
      }, 
      { new: true }
    );

    await AuditLog.create({
      action: req.body.status === 'Published' ? 'PUBLISH' : 'UPDATE',
      entityType: 'Part',
      entityId: updatedPart?._id,
      oldValue: oldPart,
      newValue: updatedPart,
      adminId: req.body.adminId || '60d0fe4f5311236168a109ca'
    });

    try {
      await fetch('http://localhost:3000/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: 'parts', path: '/parts-supply' })
      });
    } catch(e) { /* ignore */ }

    res.json({ success: true, data: updatedPart });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Update failed', error: error instanceof Error ? error.message : String(error) });
  }
});

// DELETE PART
router.delete('/parts/:id', async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);
    if (!part) return res.status(404).json({ success: false, message: 'Part not found' });

    await Part.findByIdAndDelete(req.params.id);

    await AuditLog.create({
      action: 'DELETE',
      entityType: 'Part',
      entityId: part._id,
      oldValue: part,
      adminId: '60d0fe4f5311236168a109ca',
      details: `Deleted part: ${part.name}`
    });

    try {
      await fetch('http://localhost:3000/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: 'parts', path: '/parts-supply' })
      });
    } catch(e) { /* ignore */ }

    res.json({ success: true, message: 'Part deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Delete failed', error: error instanceof Error ? error.message : String(error) });
  }
});

/**
 * =====================================
 * PAGE CONFIGURATION
 * =====================================
 */

// GET PAGE CONFIG
router.get('/pages/:pageId', async (req, res) => {
  try {
    const pageConfig = await PageConfig.findOne({ pageId: req.params.pageId });
    res.json({ success: true, data: pageConfig });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch page config', error: error instanceof Error ? error.message : String(error) });
  }
});

// UPDATE PAGE CONFIG
router.put('/pages/:pageId', async (req, res) => {
  try {
    const pageConfig = await PageConfig.findOneAndUpdate(
      { pageId: req.params.pageId },
      { 
        sections: req.body.sections,
        lastEditedBy: req.body.adminId || '60d0fe4f5311236168a109ca',
        updatedAt: new Date()
      },
      { new: true, upsert: true }
    );

    await AuditLog.create({
      action: 'UPDATE',
      entityType: 'PageConfig',
      entityId: pageConfig._id,
      adminId: req.body.adminId || '60d0fe4f5311236168a109ca',
      details: `Updated page configuration for: ${req.params.pageId}`
    });

    // Trigger Frontend Revalidation Webhook
    try {
      await fetch('http://localhost:3000/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: 'pages', path: `/${req.params.pageId}` })
      });
    } catch(e) { console.error('Failed to trigger revalidation'); }

    res.json({ success: true, data: pageConfig });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update page config', error: error instanceof Error ? error.message : String(error) });
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
    res.status(500).json({ success: false, message: 'Failed to fetch versions', error: error instanceof Error ? error.message : String(error) });
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
    res.status(500).json({ success: false, message: 'Failed to restore version', error: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
