// The idea is that you first upgrade ui-demo and then use this to sync the versions to ui
// The reason behind that is ui-demo is an actual Expo project, and you can then use
// npx expo install --fix
// to make sure all versions we are using are Expo-supported before just upgrading all of ui


const fs = require('fs');

const sourcePackagePath = '../flourish/app/package.json';
const targetPackagePath = 'packages/ui-demo/package.json';

const sourcePackageJson = JSON.parse(fs.readFileSync(sourcePackagePath, 'utf8'));
const targetPackageJson = JSON.parse(fs.readFileSync(targetPackagePath, 'utf8'));

// make a list of all the dependencies and their corresponding versions from the source
const sourceDependencies = {
  ...sourcePackageJson.dependencies,
  ...sourcePackageJson.devDependencies,
};

['dependencies', 'devDependencies'].forEach((key) => {
    if (!targetPackageJson[key]) {
        return;
    }
    Object.keys(targetPackageJson[key]).forEach((dependency) => {
        if (sourceDependencies[dependency]) {
            targetPackageJson[key][dependency] = sourceDependencies[dependency];
        }
    });
});

fs.writeFileSync(targetPackagePath, JSON.stringify(targetPackageJson, null, 2));
