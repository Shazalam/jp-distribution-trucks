import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper for programmatic uploads (e.g. from buffers or URLs)
export const uploadToCloudinary = async (fileString: string, folder: string) => {
  try {
    const result = await cloudinary.uploader.upload(fileString, {
      folder: `jp-distribution/${folder}`,
      resource_type: 'auto',
    });
    // Return optimized URL
    return result.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw new Error('Failed to upload media to Cloudinary');
  }
};

// Multer Storage Configuration for Express Route Middleware
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine folder dynamically based on route or fallback to 'cms-uploads'
    const folderName = req.body.category || 'cms-uploads';
    return {
      folder: `jp-distribution/${folderName}`,
      allowed_formats: ['jpg', 'png', 'webp', 'jpeg', 'mp4', 'mov', 'avif'],
      resource_type: file.mimetype.startsWith('video') ? 'video' : 'image',
      transformation: file.mimetype.startsWith('video') ? undefined : [{ quality: 'auto', fetch_format: 'auto' }],
    };
  },
});

export const uploadMiddleware = multer({ storage });

export default cloudinary;
