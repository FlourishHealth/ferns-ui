// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("./package.json");
if (require.main === module) {
  let errors = 0;
  for (const peerDep of Object.keys(pkg.peerDependencies)) {
    if (pkg.devDependencies[peerDep] !== pkg.peerDependencies[peerDep]) {
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
