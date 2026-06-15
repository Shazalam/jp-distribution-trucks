const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary using hardcoded credentials for the script
cloudinary.config({
  cloud_name: 'dd8a5dpnh',
  api_key: '494626348732398',
  api_secret: 'JVJg43e_bl9KKe1sSa3JhhWO87g'
});

const IMAGES_DIR = path.join(__dirname, '../public/images');
const OUTPUT_JSON = path.join(__dirname, 'cloudinary-mapping.json');

const mapping = {};

async function uploadImage(filePath, relativePath) {
  try {
    // Determine the Cloudinary folder and public_id based on local path
    // e.g., 'home/hero/image.png' -> folder: 'jp-distribution/home/hero', public_id: 'image'
    
    const ext = path.extname(relativePath);
    const idWithoutExt = relativePath.replace(ext, '');
    const folderPath = path.dirname(idWithoutExt).replace(/\\/g, '/'); // normalize for windows
    const fileName = path.basename(idWithoutExt);

    const cloudinaryPath = folderPath === '.' ? `jp-distribution/${fileName}` : `jp-distribution/${folderPath}/${fileName}`;
    const cloudinaryFolder = folderPath === '.' ? 'jp-distribution' : `jp-distribution/${folderPath}`;

    const result = await cloudinary.uploader.upload(filePath, {
      folder: cloudinaryFolder,
      public_id: fileName,
      resource_type: 'image',
      overwrite: true,
    });

    console.log(`✅ Uploaded: ${relativePath} -> ${result.secure_url}`);
    
    // Store mapping from local URL path to Cloudinary URL
    const localUrlPath = `/images/${relativePath.replace(/\\/g, '/')}`;
    
    // Transform to use f_auto,q_auto
    // The secure_url looks like: https://res.cloudinary.com/dd8a5dpnh/image/upload/v1234567890/jp-distribution/...
    // We want to insert f_auto,q_auto
    const optimizedUrl = result.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
    
    mapping[localUrlPath] = optimizedUrl;

  } catch (error) {
    console.error(`❌ Failed to upload ${relativePath}:`, error);
  }
}

async function traverseDir(dir, baseDir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await traverseDir(filePath, baseDir);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext)) {
        const relativePath = path.relative(baseDir, filePath);
        await uploadImage(filePath, relativePath);
      }
    }
  }
}

async function run() {
  console.log('Starting Cloudinary Upload...');
  
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Directory not found: ${IMAGES_DIR}`);
    return;
  }
  
  await traverseDir(IMAGES_DIR, IMAGES_DIR);
  
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(mapping, null, 2));
  console.log(`\n🎉 Finished! Uploaded ${Object.keys(mapping).length} images.`);
  console.log(`Mapping saved to ${OUTPUT_JSON}`);
}

run();
