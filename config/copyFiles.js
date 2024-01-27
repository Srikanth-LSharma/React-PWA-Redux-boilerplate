const fs = require('fs-extra');

// Copy service-worker.js to the build folder post build.
const serviceWorkerSourcePath = './src/service-worker.js';
const serviceWorkerDestinationPath = './build/service-worker.js';

if (fs.existsSync(serviceWorkerDestinationPath)) {
    fs.unlinkSync(serviceWorkerDestinationPath);
}

fs.copySync(serviceWorkerSourcePath, serviceWorkerDestinationPath);

// Copy manifest.json to the build folder post build.
const manifestSourcePath = './public/manifest.json';
const manifestDestinationPath = './build/manifest.json';

if (fs.existsSync(manifestDestinationPath)) {
    fs.unlinkSync(manifestDestinationPath);
}

fs.copySync(manifestSourcePath, manifestDestinationPath);
