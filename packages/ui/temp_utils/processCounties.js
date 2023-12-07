const fs = require("fs");
import {USSTATESLIST} from "../src/Constants";

// It takes a single optional argument, which is the path to the csv file. If no argument is provided, it will default to the file in the current directory named countyData.csv.
// It will output a file named CountyAndEquivalentEntities.tsx with a single object, COUNTY_AND_COUNTY_EQUIVALENT_ENTITIES
// const CountyAndCountyEquivalentEntities={
// stateName: string //use States Name, no spaces, all lowercase for search ability ={
//   countyName:string // use county name, no spaces, all lowercase for search ability ={
//     stateFP: string
//     countyFP: string
//     }
//   }
// }
// # Run the command:
// node censusDataProcessor.js [path/to/countyData.csv]

const filePath = process.argv[2] || "./countyData.csv";

const getStateName = (abbreviation) => {
  const state = USSTATESLIST.find((st) => st.label === abbreviation);
  return state ? state.value.toLowerCase().replace(/\s/g, "") : null;
};

const formatObjectAsString = (obj) => {
  let str = "export const COUNTY_AND_COUNTY_EQUIVALENT_ENTITIES = {\n";
  for (const state in obj) {
    str += `  ${state}: {\n`;
    for (const county in obj[state]) {
      const {stateFP, countyFP} = obj[state][county];
      str += `    ${county}: { stateFP: "${stateFP}", countyFP: "${countyFP}" },\n`;
    }
    str += "  },\n";
  }
  str += "};\n";
  return str;
};

const processCSV = (fp) => {
  const data = fs.readFileSync(fp, "utf8");
  const lines = data.split("\n");

  return lines.reduce((countyData, line, index) => {
    if (index === 0) return countyData; // Skip the header line
    const [stateAbbrev, stateFP, countyFP, , countyName] = line.split("|");
    const stateName = getStateName(stateAbbrev);
    if (stateName) {
      const countyKey = countyName
        .trim()
        .toLowerCase()
        .replace(/[\s.'-]/g, "");
      countyData[stateName] = countyData[stateName] || {};
      countyData[stateName][countyKey] = {stateFP, countyFP};
    }
    return countyData;
  }, {});
};

const countyAndEquivalentEntities = processCSV(filePath);
const content = formatObjectAsString(countyAndEquivalentEntities);
if (fs.existsSync("CountyAndEquivalentEntities.js")) {
  // If the file exists, delete it
  fs.unlinkSync("CountyAndEquivalentEntities.js");
}
fs.writeFileSync("CountyAndEquivalentEntities.js", content, "utf8");

// console.log("File created successfully.");
