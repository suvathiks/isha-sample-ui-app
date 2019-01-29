# Dependencies:-
1. "keycloak-angular"
2. "@ngxs/store"

# Description:-
This module integrates Authentication using Keycloak.

## Features include:-
1. Stores keycloak token in the global state.
2. Automatically injects the token in the Authorization header on all outbound HTTP requests.
3. Automatically looks for updates in token every 10 seconds and updates it in state if yes.

Follow instructions below to enable it.

# Instructions

1. Make sure to define the appropriate Keycloak URLs and variables in the environment files in `/src/environments/*.ts`
2. In angular.json file, within architect.build.options.scripts, add this - "./node_modules/keycloak-js/dist/keycloak.min.js"

**Source** - The current implementation of Keycloak draws from this guide and builds on top of it - https://medium.com/@blained3/connecting-keycloak-to-angular-d175c92a0dd3