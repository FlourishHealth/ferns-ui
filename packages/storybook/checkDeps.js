// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("./package.json");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const peerPkg = require("./src/package.json");
if (require.main === module) {
  let errors = 0;
  for (let peerDep of Object.keys(peerPkg.peerDependencies)) {
    console.log(peerDep);
    if (pkg.devDependencies[peerDep] !== peerPkg.peerDependencies[peerDep]) {
      console.error(
        `Peer Dependency ${peerDep} is ${pkg.peerDependencies[peerDep]} not equal to ` +
          `Dev Dependency ${pkg.devDependencies[peerDep]}`
      );
      errors += 1;
    }
  }
  if (errors > 0) {
    process.exit(1);
  }
} else {
  console.error("Must be run as a module");
}
