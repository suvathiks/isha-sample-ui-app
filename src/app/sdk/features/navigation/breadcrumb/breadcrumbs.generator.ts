import { sitemap, Link } from './../../../config/sitemap.config';
import { convertSitemapToLinearArrayOfLinks } from './../navigation.functions';

/**
 * Converts the hierarcy of link arrays from previous step,
 * into an object with key as the paths and then its value,
 * as the list of parent links, aka breadcrumbs.
 */
const generateBreadcrumbs = smap => {
    const crumbs = {};
    let allLinks = convertSitemapToLinearArrayOfLinks(smap);
    allLinks = allLinks.map(link => {
        const linkPath = link.path;
        if (linkPath) {
            crumbs[linkPath] = [{ label: link.label, path: link.path, icon: link.icon }];
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
    for (const key in crumbs) {
        if (crumbs[key]) {
            crumbs[key] = crumbs[key].reverse();
        }
    }
    return crumbs;
};

export const breadcrumbs = generateBreadcrumbs(sitemap);
