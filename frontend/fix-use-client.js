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
    
    if (content.includes('"use client"')) {
        // Remove it from wherever it is (handling with/without semicolon)
        content = content.replace(/"use client";?\n?/g, '');
        // Add it to the very top
        content = '"use client";\n' + content;
        fs.writeFileSync(file, content, 'utf8');
    }
});

console.log('Fixed use client placement.');
