# VSC Packages

**(vsc-packages)**

A VSC extension to list packages from package.json and search for and install packages.

**This is a work-in-progress and began so that I could learn how to make web views and tree views for VSC extensions.**

**Installation of packages is currently not possible but coming soon**

![alt text](https://raw.githubusercontent.com/sketchbuch/vsc-packages/master/docs/images/vsc-packages-ani.gif 'VSC Packages')

## How to use

This extension will add a new sidebar to VSC that lists all workspace folders. Selecting a folder will list all the dependencies contained within the package.json file with a link to the relevant NPM page. You can also view more details within VSC by clicking on one of the dependencies.

Doing so opens a new editor showing information obtained from the NPM registry including the readme, version history - with links to each version's NPM page and links to contact developers involved with the package.

Other links to the package's repository and bug tracker are also provided

## Todo

- Add ability to install a specific version or upgrade to a specific version
- Show uninstalled packages differently in the sidebar
- Show out-of-date packages differently in the sidebar
- Show unused packages differently in the sidebar
- Cache package data from NPM for a short time
- Cache selected tab in the revive state so that on revival the last active tab can be selected
- ~~Add a file watcher to update the sidebar if the package.json file changes~~ **DONE**
- ~~Add search functionality - as tree views can't show a search box this will probably be in a web view.~~ **DONE**
- ~~Support different repos in the same worksapce. Currently it only works with one folder in the workspace, to support multiple workspace folders with their own package.json some kind of selector would need to be added (a bit like in the SCM)~~ **DONE**

## Latest Version

### [1.1.3] - 2020-01-17

- Code refactor
