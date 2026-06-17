const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://www.transparenttextures.com/patterns/stardust.png';
const dest = path.join(__dirname, '..', 'public', 'stardust.png');

const file = fs.createWriteStream(dest);

https.get(url, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to get stardust.png: ${response.statusCode} ${response.statusMessage}`);
    return;
  }
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Download completed successfully.');
  });
}).on('error', (err) => {
  fs.unlink(dest, () => {}); // Delete the file on error
  console.error(`Error downloading file: ${err.message}`);
});
