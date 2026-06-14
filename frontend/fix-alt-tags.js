const fs = require('fs');
const path = require('path');

const directoryPath = path.join(process.cwd(), 'src/app');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx')) results.push(file);
        }
    });
    return results;
}

const files = walk(directoryPath);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // Find all <Image ... />
    const imgRegex = /<Image\s+([^>]+)>/g;
    content = content.replace(imgRegex, (match, attrs) => {
        if (!attrs.includes('alt=')) {
            changed = true;
            console.log('Fixed missing alt in: ' + file);
            return `<Image alt="JP Distribution Trucks" ${attrs}>`;
        }
        return match;
    });

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
    }
});

console.log('Fixed missing alt tags successfully.');
