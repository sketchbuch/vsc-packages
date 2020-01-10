# VSC Packages

**(vsc-packages)**

A VSC extension to list packages from package.json and search for and install packages.

**This is a work-in-progress and began so that I could learn how to make webviews for VSC extensions**

## Todo

- Add a search function
- Add ability to install a specific version or upgrade to a specific version
- Show uninstalled packages differently in the sidebar
- Show out-of-date packages differently in the sidebar
- Show unused packages differently in the sidebar
- Cache package data from NPM for a short time
- Cache selected tab in the revive state so that on revival the last active tab can be selected
- Support different repos in the same worksapce. Currently it only works with one folder in the workspace, to support multiple workspace folders with their own package.json some kind of selector would need to be added (a bit like in the SCM)
