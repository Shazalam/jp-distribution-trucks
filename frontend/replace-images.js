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
    
    // Add import Image from 'next/image' if not exists and if we have <img
    if (content.includes('<img ') && !content.includes('import Image from \"next/image\"') && !content.includes("import Image from 'next/image'")) {
        content = 'import Image from \"next/image\";\n' + content;
    }

    // Replace <img ... />
    // We match <img ... /> 
    const imgRegex = /<img\s+([^>]+)>/g;
    content = content.replace(imgRegex, (match, attrs) => {
        // If it already has width/height, we don't necessarily need fill
        if (attrs.includes('width=') || attrs.includes('height=')) {
           return `<Image ${attrs}>`;
        }

        // Clean up className
        let classNameMatch = attrs.match(/className=["']([^"']+)["']/);
        let newClassName = classNameMatch ? classNameMatch[1] : '';
        newClassName = newClassName.replace(/w-full/g, '').replace(/h-full/g, '').replace(/absolute/g, '').replace(/inset-0/g, '').replace(/top-0/g, '').replace(/left-0/g, '').trim();
        // remove multiple spaces
        newClassName = newClassName.replace(/\s+/g, ' ');

        let newAttrs = attrs;
        if (classNameMatch) {
            newAttrs = newAttrs.replace(classNameMatch[0], `className="${newClassName}"`);
        }
        
        // Ensure self closing
        if (!newAttrs.endsWith('/')) {
            newAttrs += ' /';
        }

        // Default to fill and sizes, and lazy loading
        // Check if it's the hero image for priority
        const isPriority = newAttrs.includes('cinematic_hilux_hero.png') || newAttrs.includes('truck_hero');
        const loadingAttr = isPriority ? 'priority' : 'loading="lazy"';

        return `<Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" ${loadingAttr} ${newAttrs}>`;
    });

    fs.writeFileSync(file, content, 'utf8');
});

console.log('Replaced images successfully.');
