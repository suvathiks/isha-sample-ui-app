import { Component, OnInit, Input } from '@angular/core';
import { breadcrumbs } from './breadcrumbs.generator';
import { homeLink } from './../../../config/sitemap.config';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
    currentUrl: string;
    breadcrumbs = [];
    homeLink = homeLink;
    hasPath(crumb) {
        if (crumb.path) {
            return true;
        } else {
            return false;
        }
    }
    urlContainsPath(path) {
        if (this.currentUrl.includes(';')) {
            this.currentUrl = this.currentUrl.split(';')[0];
        }
        return this.currentUrl.endsWith(path);
    }

    evaluateBreadcrumbs() {
        this.currentUrl = window.location.href;
        // Detecting url change
        let noneFound = true;
        for (const key in breadcrumbs) {
            if (this.urlContainsPath(key)) {
                noneFound = false;
                this.breadcrumbs = breadcrumbs[key];
            }
        }
        if (noneFound) {
            this.breadcrumbs = [];
        }
    }

    constructor(private router: Router) {
        // Capturing the currentPath
        router.events.subscribe((_: NavigationEnd) => {
            if (_.url !== undefined) {
                // Getting current path from window.location.pathname for more accuracy
                this.currentUrl = window.location.href;
                this.evaluateBreadcrumbs();
            }
        });
    }

    ngOnInit() {
        // Generating breadcrumbs on init
        this.evaluateBreadcrumbs();
    }
}
