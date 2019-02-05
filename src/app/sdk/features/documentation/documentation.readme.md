# Dependencies:-
1. "@compodoc/compodoc" // Add this as devDependency. use `yarn add @compodoc/compodoc --dev`

# Description:-
With this package, documentation can be auto-generated.

## Features include:-
1. Clean documentation auto-generated.
2. Highly customizable. Instructions for all customizations available on official documentation for this package. (current link - https://compodoc.app/guides/usage.html) 

Follow instructions below to enable it.

# Instructions

1. Add the devDependencies and include this in the scripts section of package.json - "compodoc": "rm src/assets/documentation -rf && ./node_modules/.bin/compodoc -p src/tsconfig.app.json --disableSourceCode --disableDomTree --disableTemplateTab --disableGraph --disableCoverage --disablePrivate --disableProtected --disableInternal --disableLifeCycleHooks --disableRoutesGraph --disableSearch --watch --output src/assets/documentation"
2. Run `yarn compodoc` or `npm compodoc`
3. To generate sensible documentation, use JSdoc conventions to annotate code with inline comments. These will be automatically generated as documentation.

