# Dependencies
1. "primeng"
2. "@angular/material"

# Description

This module lets you specify a sitemap including a hierarchy of routes in a config file and a fully functional sidenav along with breadcrumb and topnav will be available out of the box. 

## Features include:-
1. Mini sidenav that is always persistent and shows icons of first level routes. On hover, it shows tooltip of what resource the icon belongs to.
2. Collapsible sidenav that shows full listing of all first and second level links on the site. Highlights resources that is currently active.
3. Persistent fixed topnav that shows logo and breadcrumbs.
4. All of the above is generated once you specify the sitemap in the config.

Follow instructions below to enable it.

# Instructions

1. Configure the `sdk/config/sitemap.config.ts` file to list out all routes on the UI in a hierarchical way. Sample can be found in the file.
2. Copy the code in `src/app/app.component.html` into the template of your bootstrap component for the navigation module to be available throughout the app.

Once the above steps are complete, a sidenav, a topnav and breadcrumbs will be automatically generated. You may additionally customize them by tweaking their respective templates files.
