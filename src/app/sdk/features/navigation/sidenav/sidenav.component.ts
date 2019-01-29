import { Component, OnInit, Input } from "@angular/core";
import { sitemap, homeLink, Link } from "./../../../config/sitemap.config";
import { Router, NavigationEnd } from "@angular/router";
import _ from "lodash";

/**
 * @param {Link} currentLink The link object whose path is the currentPath
 * @param {boolean} showSidebar Boolean to control whether the sidebar is shown or not
 * @param {Link[]} navLinks all navigation links
 * @param {Link} clickedLink Link that was last clicked on, used to show its children and all its parents expanded
 * @param {Link[]} childLinks Children links of the clickedLink
 * @param {Link} homeLink Link to home page
 */
@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent implements OnInit {
  @Input()
  currentPath: string;
  showSidebar: boolean = false;
  navLinks: Link[];
  clickedLink: Link = new Link();
  childLinks: Link[];
  homeLink: Link = homeLink;

  isPathInLink = (path: string, link: Link) => {
    const linkString = JSON.stringify(link);
    if (linkString.includes(`path":"${path}"`)) {
      return true;
    } else return false;
  };

  setClickedLink = (link: Link) => {
    this.clickedLink = link;
    this.childLinks = link.children;
  };

  resetClickedLink = () => {
    this.clickedLink = new Link();
  };

  onSidenavLinkClick = (link: Link) => {
    if (link.path !== null) {
      this.showSidebar = false;
    }
    if (this.isLinkChild(link, this.clickedLink)) {
      this.resetClickedLink();
    } else {
      this.setClickedLink(link);
    }
  };

  onMiniSidenavLinkClick = (link: Link) => {
    this.setClickedLink(link);
    this.showSidebar = true;
  };

  /**
   * Returns true if link2 is contained within link1
   */
  isLinkChild = (parentLink: Link, link: Link) => {
    const parentLinkId = `${parentLink.label}${parentLink.path}`;
    const childLinkId = `${link.label}${link.path}`;
    if (parentLinkId === childLinkId) {
      return true;
    } else if (parentLink.children.length) {
      const parentLinkString = JSON.stringify(parentLink);
      if (
        parentLinkString.includes(`"label":"${link.label}"`) &&
        parentLinkString.includes(`path":"${link.path}"`)
      ) {
        return true;
      }
    }
    return false;
  };
  /**
   * Takes in a link and returns true if its path
   * or that of its children contain the currentPath.
   */
  sidebarActiveLink = (link: Link) => {
    const linkPath = link.path;
    if (linkPath === this.currentPath) {
      return true;
    } else if (
      this.isPathInLink(this.currentPath, link) &&
      link !== this.clickedLink
    ) {
      return true;
    }
    return false;
  };

  constructor(private router: Router) {
    // Detecting url change
    router.events.subscribe((_: NavigationEnd) => {
      if (_.url !== undefined) {
        // Getting current path from window.location.pathname for more accuracy
        this.currentPath = window.location.pathname;
      }
    });
  }

  ngOnInit() {
    this.navLinks = sitemap.map(item => item);
  }
  ngOnChanges(changes) {}
}
