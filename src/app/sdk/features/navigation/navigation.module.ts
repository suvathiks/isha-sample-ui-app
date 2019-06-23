import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopnavComponent } from './topnav/topnav.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NavigationStylingModule } from './navigation.styling.imports';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../../../app.component';

@NgModule({
    declarations: [AppComponent, SidenavComponent, TopnavComponent, BreadcrumbComponent],
    imports: [CommonModule, RouterModule, NavigationStylingModule]
})
export class NavigationModule {}
