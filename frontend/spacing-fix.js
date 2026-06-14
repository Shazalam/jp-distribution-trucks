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
    let original = content;

    // Standardize massive py-32 -> py-14 md:py-20
    content = content.replace(/\bpy-32\b/g, 'py-14 md:py-20');
    
    // Standardize massive lg:py-48 -> py-14 md:py-20
    content = content.replace(/\blg:py-48\b/g, ''); // we will just rely on py-20
    content = content.replace(/\blg:pt-48\b/g, 'lg:pt-40');
    content = content.replace(/\blg:pb-32\b/g, 'lg:pb-24');

    // Standardize pt-32 pb-16 -> py-14 md:py-20
    content = content.replace(/\bpt-32 pb-16\b/g, 'py-14 md:py-20');
    
    // Replace pt-16 pb-32
    content = content.replace(/\bpt-16 pb-32\b/g, 'py-14 md:py-20');

    // Remove min-h-[700px] specifically from the hero sections to let content dictate height
    content = content.replace(/\bmin-h-\[700px\]\b/g, 'min-h-[60vh]');
    
    // Remove mb-32 and replace with standard gap
    content = content.replace(/\bmb-32\b/g, 'mb-16');

    // Replace mb-28 with mb-16
    content = content.replace(/\bmb-28\b/g, 'mb-12');

    // Common min-h-screen wrappers that stretch content on pages
    // Only target specific patterns to avoid breaking auth/login pages
    if (file.includes('trucks') || file.includes('custom-builds') || file.includes('parts-supply') || file.includes('wholesale-retail')) {
        content = content.replace(/className="min-h-screen bg-\[#050505\]/g, 'className="min-h-[80vh] bg-[#050505]');
    }
    
    // Fix pt-32 pb-24 in about page
    content = content.replace(/\bpt-32 pb-24\b/g, 'pt-24 pb-16');

    // We don't want empty h-20 spacers
    content = content.replace(/<div className="h-20"><\/div>/g, '');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed spacing in: ' + file);
    }
});

console.log('Mass spacing replacement completed.');
