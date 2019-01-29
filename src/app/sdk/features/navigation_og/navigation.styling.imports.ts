import { MatButtonModule, MatCheckboxModule } from "@angular/material";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";

import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { SidebarModule } from "primeng/sidebar";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { PanelMenuModule } from "primeng/panelmenu";
import { ToastModule } from "primeng/toast";
import { TooltipModule } from "primeng/tooltip";
import { BreadcrumbModule } from "primeng/breadcrumb";

import { NgModule } from "@angular/core";

@NgModule({
  imports: [
    MatToolbarModule,
    SidebarModule,
    ProgressSpinnerModule,
    TooltipModule
  ],
  exports: [
    MatToolbarModule,
    SidebarModule,
    ProgressSpinnerModule,
    TooltipModule
  ]
})
/**@ignore */
export class NavigationStylingModule {}
