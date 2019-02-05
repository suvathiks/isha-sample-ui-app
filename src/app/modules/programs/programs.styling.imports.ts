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

@NgModule({
  imports: [
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
    MatIconModule
  ],
  exports: [
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
    MatIconModule
  ]
})
/**@ignore */
export class ProgramsStylingModule {}
