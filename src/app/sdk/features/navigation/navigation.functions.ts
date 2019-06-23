import { Link } from './../../config/sitemap.config';

/**
 * Converts the sitemap into a hierarchy of arrays of links
 */
export const convertSitemapToLinearArrayOfLinks = sitemap => {
    let currentLevel = JSON.parse(JSON.stringify(sitemap)); // The level of links currently being scanned. Starting off with the root level...
    let childLinks = []; // Will store a comprehensive list of all child links in current level
    let allLinks = []; // Comprehensive list of all links in all the levels of the sitemap
    let done = false; // Keeps track of when to stop, when there are no child links in a certain level
    let level = 1; // Current level
    const linksObject = {}; // Stores list of levels with mapped to an array of correponding links present in that level
    do {
        // running through the current level...
        linksObject[level] = [];
        // Looping through the links in the currentLevel
        currentLevel.map(link => {
            // Adding the link to the linksObject's array of links for the level
            linksObject[level] = linksObject[level].concat([link]);
            // Gathering the array of child links for the current link in the map function
            const childrenLink = link.children.map(c => {
                // adding the attribute parentLink, which helps generate the breadcrumbs in the generateBreadcrumbs function above
                c = { ...c, parentLink: link };
                return c;
            });
            // Adding the list of childrenLinks to the childLinks array if any children are present
            childLinks = link.children.length ? childLinks.concat(childrenLink) : childLinks;
        });
        // Incrementing the level by 1
        level++;
        currentLevel = childLinks;
        if (!currentLevel.length) {
            // In case there are no more child links in the current level, we stop the while loop
            done = true;
        }
        childLinks = []; // Resetting the childLinks to empty array to prepare to repeat the process for next level
    } while (!done);
    for (let i = 1; i < level; i++) {
        // Gathering all the links present in all the levels
        allLinks = allLinks.concat(linksObject[i]);
    }
    return allLinks;
};
