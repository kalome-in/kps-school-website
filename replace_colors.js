const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walk(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

const dirs = ['./app', './components'];

dirs.forEach(dir => {
  walk(dir, (file) => {
    if (!file.endsWith('.tsx') && !file.endsWith('.ts')) return;
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Header top bar
    content = content.replace(/bg-school-yellow text-school-black/g, 'bg-school-red text-white');
    // Primary Button in page
    content = content.replace(/bg-school-yellow hover:bg-yellow-400 text-school-black/g, 'bg-school-red hover:bg-red-700 text-white');
    // Other specific elements
    content = content.replace(/text-school-black hover:bg-school-yellow/g, 'text-school-black hover:bg-school-red hover:text-white');
    
    // Admissions step number
    content = content.replace(/bg-school-yellow text-school-black font-bold shrink-0/g, 'bg-school-red text-white font-bold shrink-0');
    
    // Facilities page 
    content = content.replace(/bg-school-yellow rounded-\[40px\]/g, 'bg-school-red text-white rounded-[40px]');
    content = content.replace(/bg-school-black text-school-yellow/g, 'bg-school-black text-school-orange');
    
    // In generally, map "school-yellow" to "school-red" where it acts as background or text highlighting
    // Warning: some might need to be orange or stay yellow depending on context.
    
    // Primary accent classes (Yellow -> Red)
    content = content.replace(/bg-school-yellow\/20/g, 'bg-school-red/10');
    content = content.replace(/bg-school-yellow(?![-\/])/g, 'bg-school-red');
    content = content.replace(/text-school-yellow/g, 'text-school-red');
    content = content.replace(/border-school-yellow/g, 'border-school-red');
    content = content.replace(/ring-school-yellow/g, 'ring-school-red');

    // Make some of the red -> orange, and orange -> yellow to balance it out if needed, 
    // but the user said "red and orange as main colors and then yellow".
    // Currently, orange is already heavily used as main (buttons, links, active states).
    // Now red will replace yellow for cards and major highlights.
    // What about actual yellow? Let's add some yellow to places that are currently orange, to use it out as tertiary.
    // Specifically, let's look for "school-orange" in small icon backgrounds and change it to yellow.
    content = content.replace(/bg-school-orange\/10/g, 'bg-school-yellow/20');
    
    // Also change hover:bg-[#E67200] to hover:bg-orange-600
    content = content.replace(/hover:bg-\[\#E67200\]/g, 'hover:bg-orange-600');

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated: ' + file);
    }
  });
});
