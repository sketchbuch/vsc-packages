# VSC Packages

**(vsc-packages)**

A VSC extension to list packages from package.json and search for and install packages.

**This is a work-in-progress and began so that I could learn how to make web views and tree views for VSC extensions.**

![alt text](https://raw.githubusercontent.com/sketchbuch/vsc-packages/master/docs/images/vsc-packages-ani.gif 'VSC Packages')

## How to use

This extension will add a new sidebar to VSC that lists all workspace folders. Selecting a folder will list all the dependencies contained within the package.json file with a link to the relevant NPM page. You can also view more details within VSC by clicking on one of the dependencies.

Doing so opens a new editor showing information obtained from the NPM registry including the readme, version history - with links to each version's NPM page and links to contact developers involved with the package.

Other links to the package's repository and bug tracker are also provided.

A command is provided to search NPM (a setting is available to set if yarn or npm should be used).

Yarn Workspaces are also suppoerted and will be displayed under each workspace folder. Additional you can now search the subfolders of each workspace folder for additonal package.json files. The depth is set in the extension's settings, by default this setting is switched off. To enable it just enter a depth between 1 and 5.

## Translations

This extension is localised, if you want it in your language please send me a translated "package.nls.json" file which you can find in the root of this extension. A basic german translation is provided, but as german is not my native langauge feel free to submit corrections.

## Latest Version

#### [1.6.0](https://github.com/sketchbuch/vsc-packages/compare/v1.5.1...v1.6.0) - 2020-08-11

- Extension is now bundled with parcel
