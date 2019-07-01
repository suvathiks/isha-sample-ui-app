import { NgModule } from "@angular/core";
import { PanelModule } from "primeng/panel";
import { MessageModule } from "primeng/message";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { InputSwitchModule } from "primeng/inputswitch";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";
import {
  MatDatepickerModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatNativeDateModule,
  MatTabsModule
} from "@angular/material";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";

const imports = [
  PanelModule,
  MessageModule,
  CalendarModule,
  CheckboxModule,
  InputTextModule,
  ButtonModule,
  DialogModule,
  DropdownModule,
  InputSwitchModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatCardModule,
  MatDatepickerModule,
  AngularMultiSelectModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule
];

@NgModule({
  imports: imports,
  exports: imports
})
/**@ignore */
export class StylingModule {}
