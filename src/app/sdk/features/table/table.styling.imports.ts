import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";

@NgModule({
  imports: [
    MatButtonModule,
    ButtonModule,
    InputTextModule,
    DropdownModule
  ],
  exports: [
    MatButtonModule,
    ButtonModule,
    InputTextModule,
    DropdownModule
  ]
})
/**@ignore */
export class TableStylingModule {}
