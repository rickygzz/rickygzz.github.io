const { readdirSync, rmSync, cpSync } = require('fs');
const path = require('path');

const dirDestination = '../docs';
const dirSource = './build';
const excludeFolder = 'portfolio';

// Remove all files and folders except the excluded one
readdirSync(dirDestination).forEach(f => {
  if (f !== excludeFolder) { 
    rmSync(path.join(dirDestination, f), { recursive: true });
  }
});

// Copy new files from the build directory
cpSync(dirSource, dirDestination, { recursive: true });

console.log(`Updated ${dirDestination}, keeping ${excludeFolder} intact.`);