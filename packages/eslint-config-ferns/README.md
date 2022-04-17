# eslint-config-ferns
An eslint and prettier set up for fullstack dev: Node, React, and React Native

# Installation

Install the config and its peer dependencies:

    yarn add -D eslint-config-ferns \
      @typescript-eslint/eslint-plugin@^5.4.0 \
      @typescript-eslint/parser@^5.4.0 \
      eslint@^7.25.0 \
      eslint-config-prettier@^4.1.0 \
      eslint-plugin-import@^2.25.4 \
      eslint-plugin-lodash@^7.1.0 \
      eslint-plugin-prettier@^3.0.1 \
      eslint-plugin-react@^7.28.0 \
      eslint-plugin-react-native@^3.7.0 \
      eslint-plugin-simple-import-sort@^7.0.0 \
      prettier@^2.5.1 \
      typescript@^4.1.5
    
## Update package.json

Add:

     "eslintConfig": {
       "extends": [
         "ferns"
       ],
       "settings": {
         "react": {
           "version": "detect"
         }
       }
     },
     
Note: Even if you aren't using React in the project (for example, your API), add this to suppress a warning.

# Usage

Add to your NPM scripts in package.json:

    "scripts": {
      ...
      "lint": "eslint \"src/**/*.ts*\"",
      "lintfix": "eslint --fix \"src/**/*.ts*\"",
    }

Then run:

    yarn lintfix
    
    yarn lint
