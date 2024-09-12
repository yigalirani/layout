const fs = require('fs');
const path = require('path');

// Function to get the latest file of a given extension from a directory
function getLatestFile(directory, extension) {
    let latestFile = null;
    let latestMtime = 0;

    fs.readdirSync(directory).forEach(file => {
        if (path.extname(file) === extension) {
            const filePath = path.join(directory, file);
            const stats = fs.statSync(filePath);
            if (stats.mtimeMs > latestMtime) {
                latestMtime = stats.mtimeMs;
                latestFile = filePath;
            }
        }
    });

    return latestFile;
}

// Function to copy and rename the file
function copyAndRenameFile(source, destination, newName) {
    const data = fs.readFileSync(source);
    fs.writeFileSync(path.join(destination, newName), data);
}

// Main function
function main() {
    const downloadDirectory = path.join(process.env.USERPROFILE, 'Downloads');
    const destinationDirectory = 'C:\\yigal\\layout'; // Change this to your desired destination directory

    const jsonFile = getLatestFile(downloadDirectory, '.json');
    const hexFile = getLatestFile(downloadDirectory, '.hex');

    if (jsonFile) {
        copyAndRenameFile(jsonFile, destinationDirectory, 'kbd.json');
        console.log(`Copied and renamed ${jsonFile} to ${path.join(destinationDirectory, 'kbd.json')}`);
    } else {
        console.log('No .json file found in the Downloads directory.');
    }

    if (hexFile) {
        copyAndRenameFile(hexFile, destinationDirectory, 'kbd.hex');
        console.log(`Copied and renamed ${hexFile} to ${path.join(destinationDirectory, 'kbd.hex')}`);
    } else {
        console.log('No .hex file found in the Downloads directory.');
    }
}

main();