import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./../../../app.component";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { TopnavComponent } from "./topnav/topnav.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { NavigationStylingModule } from "./navigation.styling.imports";

@NgModule({
  imports: [CommonModule, RouterModule, NavigationStylingModule],
  declarations: [
    AppComponent,
    SidenavComponent,
    TopnavComponent,
    BreadcrumbComponent,
  ],
  providers: []
})
export class NavigationModule {}
