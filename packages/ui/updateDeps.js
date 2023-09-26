// Updates all the peerDependencies to match the devDependencies
// This is useful when you want to update all the dependencies to the latest version
// and you don't want to have to manually update the peerDependencies

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("./package.json");
if (require.main === module) {
  for (const peerDep of Object.keys(pkg.peerDependencies)) {
    if (pkg.devDependencies[peerDep] !== pkg.peerDependencies[peerDep]) {
      pkg.peerDependencies[peerDep] = pkg.devDependencies[peerDep];
    }
  }
  // save the updated package.json
  const fs = require("fs");
  fs.writeFileSync("./package.json", JSON.stringify(pkg, null, 2));
} else {
  console.error("Must be run as a module");
}
