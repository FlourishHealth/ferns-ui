// The idea is that you first upgrade ui-demo and then use this to sync the versions to ui
// The reason behind that is ui-demo is an actual Expo project, and you can then use
// npx expo install --fix
// to make sure all versions we are using are Expo-supported before just upgrading all of ui


const fs = require('fs');

const sourcePackagePath = 'packages/ui-demo/package.json';
const targetPackagePath = 'packages/ui/package.json';

// Read the source and target package.json files
const sourcePackage = JSON.parse(fs.readFileSync(sourcePackagePath, 'utf8'));
const targetPackage = JSON.parse(fs.readFileSync(targetPackagePath, 'utf8'));

// Update the versions of dependencies in the target package.json
// to match the versions in the source package.json
['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'].forEach(depType => {
    if (targetPackage[depType] && sourcePackage[depType]) {
        Object.keys(targetPackage[depType]).forEach(dep => {
            if (sourcePackage[depType][dep]) {
                targetPackage[depType][dep] = sourcePackage[depType][dep];
            }
        });
    }
});

// Write the updated target package.json back to the file
fs.writeFileSync(targetPackagePath, JSON.stringify(targetPackage, null, 2));
