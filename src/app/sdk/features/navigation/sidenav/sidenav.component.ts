import { Component, OnInit, Input } from '@angular/core';
import { sitemap, homeLink, Link } from './../../../config/sitemap.config';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { isEqual } from 'lodash';


/**
 * @param {Link} currentLink The link object whose path is the currentPath
 * @param {boolean} showSidenav Boolean to control whether the sidenav is shown or not
 * @param {Link[]} navLinks all navigation links
 * @param {Link} clickedLink Link that was last clicked on, used to show its children and all its parents expanded
 * @param {Link} homeLink Link to home page
 */
@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
    navLinks: Link[] = [];
    microSidenavWidth = getComputedStyle(document.body).getPropertyValue('--micro-sidenav-width');
    miniSidenavWidth = getComputedStyle(document.body).getPropertyValue('--mini-sidenav-width');
    showMicroSidenav = false;
    currentUrl = '';
    showSidenav = false;
    clickedLinks: Link[] = [];
    homeLink: Link = homeLink;

    /**
     * Takes the given link and pushes into the list of clicked links.
     * The clicked links array will be used to determine which links need to
     * be shown with expanded list of child links.
     */
    setClickedLink = (link: Link) => {
        this.clickedLinks.push(link);
    };

    /**
     * Removes the given link from the array of clicked links
     */
    removeClickedLink = link => {
        this.clickedLinks = this.clickedLinks.filter(l => {
            return !isEqual(link, l);
        });
    };

    onSidenavLinkClick = (link: Link) => {
        if (link.path !== null) {
            this.showSidenav = false;
        }
        if (this.clickedLinks.includes(link)) {
            this.removeClickedLink(link);
        } else {
            this.setClickedLink(link);
        }
    };

    onMiniSidenavLinkClick = (link: Link) => {
        this.clickedLinks = [];
        this.setClickedLink(link);
        if (link.path !== null) {
            this.showSidenav = false;
        } else {
            this.showSidenav = true;
        }
    };

    urlContainsPath = (path: string) => {
        return this.currentUrl.endsWith(path) ? true : false;
    };

    /**
     * Takes in a link and returns true if its path
     * or that of its children contain the currentPath.
     */
    sidenavActiveLink = (link: Link) => {
        const linkPath = link.path;
        if (this.urlContainsPath(linkPath)) {
            return true;
        }
        return false;
    };

    /**
     * Used for the minisidenav.
     * Takes in a link and returns true if its path
     * or that of its children contain the currentPath.
     */
    sidenavMiniActiveLink = (link: Link) => {
        const linkPath = link.path;
        if (this.urlContainsPath(linkPath)) {
            return true;
        } else {
            return false;
        }
    };

    toggleMicroSidenav = () => {
        if (this.showMicroSidenav) {
            document.documentElement.style.setProperty('--mini-sidenav-width', this.miniSidenavWidth);
            this.showMicroSidenav = false;
        } else {
            document.documentElement.style.setProperty('--mini-sidenav-width', this.microSidenavWidth);
            this.showMicroSidenav = true;
        }
        this.setSidenavModeToLocalStorage();
    };

    constructor(private router: Router) {
        // Detecting url change
        router.events.subscribe((nav: NavigationEnd) => {
            if (nav.url !== undefined) {
                // Getting current path from window.location.pathname for more accuracy
                this.currentUrl = window.location.href;
            }
        });
        this.navLinks = sitemap.map(item => item);
    }

    /**
     * Retrieve the showMicroSidenav from localStorage
     */
    getSidenavModeFromLocalStorage = () => {
        const showMicroSidenavFromLocalStorage = localStorage.getItem('showMicroSidenav');
        if (showMicroSidenavFromLocalStorage === 'true' || showMicroSidenavFromLocalStorage === 'false') {
            this.showMicroSidenav = showMicroSidenavFromLocalStorage === 'true';
        }
        if (this.showMicroSidenav) {
            document.documentElement.style.setProperty('--mini-sidenav-width', this.microSidenavWidth);
        } else {
            document.documentElement.style.setProperty('--mini-sidenav-width', this.miniSidenavWidth);
        }
    };

    /**
     * Set the showMicroSidenav to localStorage
     */
    setSidenavModeToLocalStorage = () => {
        localStorage.setItem('showMicroSidenav', JSON.stringify(this.showMicroSidenav));
    };

    ngOnInit() {
        // Getting the sidenav mode from localStorage
        this.getSidenavModeFromLocalStorage();
        // if (this.authResources) {
        //     this.navLinks = this.filterAuthorizedResources();
        // }
    }
    ngOnChanges(changes) {}
}
