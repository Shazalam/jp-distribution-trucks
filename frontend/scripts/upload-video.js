const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dd8a5dpnh',
  api_key: '494626348732398',
  api_secret: 'JVJg43e_bl9KKe1sSa3JhhWO87g'
});

const videoPath = path.join(__dirname, '../public/images/custom-builds/hero/custom-hero-bg.mp4');

async function run() {
  try {
    const result = await cloudinary.uploader.upload(videoPath, {
      folder: 'jp-distribution/custom-builds/hero',
      public_id: 'custom-hero-bg',
      resource_type: 'video', // Must be 'video' for mp4
      overwrite: true,
    });
    
    // For video, we can use q_auto,f_auto too!
    const optimizedUrl = result.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
    console.log(`Video uploaded to: ${optimizedUrl}`);
  } catch(e) {
    console.error(e);
  }
}

run();
