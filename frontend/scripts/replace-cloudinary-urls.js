const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src');
const MAPPING_FILE = path.join(__dirname, 'cloudinary-mapping.json');

if (!fs.existsSync(MAPPING_FILE)) {
  console.error(`Mapping file not found: ${MAPPING_FILE}`);
  process.exit(1);
}

const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));

// Convert all keys to use forward slashes for cross-platform compatibility
const normalizedMapping = {};
for (const [key, value] of Object.entries(mapping)) {
  normalizedMapping[key.replace(/\\/g, '/')] = value;
}

function traverseDir(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      traverseDir(filePath, callback);
    } else {
      callback(filePath);
    }
  }
}

let modifiedFiles = 0;

traverseDir(SRC_DIR, (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if (['.tsx', '.ts', '.jsx', '.js'].includes(ext)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Search and replace based on the mapping
    for (const [localPath, cloudUrl] of Object.entries(normalizedMapping)) {
      // Find exact string matches of the local path
      // Handle both double quotes and single quotes, and backticks if they are exact
      const regexes = [
        new RegExp(`"${localPath}"`, 'g'),
        new RegExp(`'${localPath}'`, 'g'),
        new RegExp(`\`${localPath}\``, 'g')
      ];

      for (const regex of regexes) {
        if (regex.test(content)) {
          content = content.replace(regex, `"${cloudUrl}"`); // normalize to double quotes for safety
          modified = true;
        }
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
      modifiedFiles++;
    }
  }
});

console.log(`\n🎉 Finished replacing image URLs. Modified ${modifiedFiles} files.`);
