import { sitemap } from "./../../../config/sitemap.config";

/**
 * Converts the hierarcy of link arrays from previous step,
 * into an object with key as the paths and then its value,
 * as the list of parent links, aka breadcrumbs.
 */
const generateBreadcrumbs = sitemap => {
  let crumbs = {};
  let allLinks = convertSitemapToLinearArrayOfLinks(sitemap);
  allLinks = allLinks.map(link => {
    const linkPath = link.path;
    if (linkPath) {
      crumbs[linkPath] = [
        { label: link.label, path: link.path, icon: link.icon }
      ];
      let done = false;
      let parentLink = link.parentLink;
      if (parentLink) {
        do {
          if (parentLink) {
            crumbs[linkPath] = crumbs[linkPath].concat([
              {
                label: parentLink.label,
                path: parentLink.path,
                icon: parentLink.icon
              }
            ]);
            parentLink = parentLink.parentLink ? parentLink.parentLink : null;
          } else {
            done = true;
          }
        } while (!done);
      }
    }
  });

  /**
   * Reverse the order of the breadcrumbs...
   */
  for (let key in crumbs) {
    crumbs[key] = crumbs[key].reverse();
  }
  return crumbs;
};

/**
 * Converts the sitemap into a hierarchy of arrays of links
 */
const convertSitemapToLinearArrayOfLinks = sitemap => {
  let currentLevel = JSON.parse(JSON.stringify(sitemap));
  let childLinks = [];
  let allLinks = [];
  let done = false;
  let level = 1;
  let linksObject = {};
  do {
    linksObject[level] = [];
    currentLevel.map(link => {
      linksObject[level] = linksObject[level].concat([link]);
      const childrenLink = link.children.map(c => {
        c = { ...c, parentLink: link };
        return c;
      });
      childLinks = link.children.length
        ? childLinks.concat(childrenLink)
        : childLinks;
      if (!childLinks.length) {
        done = true;
      }
    });
    level++;
    currentLevel = childLinks;
    childLinks = [];
  } while (!done);

  for (let i = 1; i < level; i++) {
    allLinks = allLinks.concat(linksObject[i]);
  }
  return allLinks;
};

export const breadcrumbs = generateBreadcrumbs(sitemap);
