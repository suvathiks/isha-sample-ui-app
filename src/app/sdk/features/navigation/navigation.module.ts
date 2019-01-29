import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { TopnavComponent } from "./topnav/topnav.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { NavigationStylingModule } from "./navigation.styling.imports";
import { AppComponent } from "../../../app.component";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    TopnavComponent,
    BreadcrumbComponent
  ],
  imports: [CommonModule, RouterModule, NavigationStylingModule]
})
export class NavigationModule {}
