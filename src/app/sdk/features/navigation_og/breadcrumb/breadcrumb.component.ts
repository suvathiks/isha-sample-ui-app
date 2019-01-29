import { Component, OnInit, Input } from "@angular/core";
import { breadcrumbs } from "./breadcrumbs.generator";
import { homeLink } from "./../../../config/sitemap.config";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"]
})
export class BreadcrumbComponent implements OnInit {
  @Input()
  currentPath: string;
  breadcrumbs = [];
  homeLink = homeLink;

  hasPath(crumb) {
    if (crumb.path) {
      return true;
    } else return false;
  }

  constructor(private router: Router) {
    // Capturing the currentPath
    router.events.subscribe((_: NavigationEnd) => {
      if (_.url !== undefined) {
        // Getting current path from window.location.pathname for more accuracy
        this.currentPath = window.location.pathname;
        // Detecting url change
        this.breadcrumbs = breadcrumbs[this.currentPath]
          ? breadcrumbs[this.currentPath]
          : [];
      }
    });
  }

  ngOnInit() {
    // Generating breadcrumbs on init
    this.breadcrumbs = breadcrumbs[this.currentPath]
      ? breadcrumbs[this.currentPath]
      : [];
  }
}
