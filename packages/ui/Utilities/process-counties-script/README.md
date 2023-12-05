# Census Data Transformation Script

## Overview

This script is designed to process county data obtained from the Census Bureau and convert it into a format that facilitates easy lookup of state and county FIPS codes based on county names. Its purpose is to simplify the management of census data in various applications.

## Usage

Open your terminal or command prompt and navigate to the directory containing the script.

    # Run the command:
    node censusDataProcessor.js [path/to/countyData.csv]

- It will generate a file named `CountyAndEquivalentEntities.js` in the current directory. This file will contain a single JavaScript object named `COUNTY_AND_COUNTY_EQUIVALENT_ENTITIES`

- Copy and replace the existing `COUNTY_AND_COUNTY_EQUIVALENT_ENTITIES` object in the project's Constants.tsx file located at `~/ui/src/Constants.tsx`

Update `countyData.csv` by selecting **United States** in [Census Bureau's Link](https://www.census.gov/library/reference/code-lists/ansi.html#cou) and importing file to this directory as CSV.

## Warning

County codes, although uncommon, are subject to change. The Census Bureau may periodically update county codes, potentially affecting the accuracy of the `COUNTY_AND_COUNTY_EQUIVALENT_ENTITIES` object. To maintain data accuracy, it is advisable to periodically check and update the script based on the latest information available from the Census Bureau's website: [Census Bureau County Codes](https://www.census.gov/library/reference/code-lists/ansi.html#cou).

Some county names may lack standardized formats. In such instances, it is to comment out entries until standardization is determined.
**States not supported:**
-American Samoa
-Commonwealth of Northern Mariana Islands
-Guam
-Puerto Rico
-U.S. Minor Outlying Islands
-U.S. Virgin Islands

**Counties not supported:**
-New Mexico - Doña Ana County
