import { NgModule } from "@angular/core";
// import { ToastModule } from "primeng/toast";
import { PanelModule } from "primeng/panel";
// import { MessageModule } from "primeng/message";
// import { CalendarModule } from "primeng/calendar";
// import { CheckboxModule } from "primeng/checkbox";
// import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
// import { DropdownModule } from "primeng/dropdown";
// import { InputSwitchModule } from "primeng/inputswitch";
import { ProgressSpinnerModule } from "primeng/progressspinner";

@NgModule({
  imports: [
    PanelModule,
    // ToastModule,
    // MessageModule,
    // CalendarModule,
    // CheckboxModule,
    // InputTextModule,
    ButtonModule,
    DialogModule,
    ProgressSpinnerModule
    // DropdownModule,
    // InputSwitchModule
  ],
  exports: [
    PanelModule,
    // ToastModule,
    // MessageModule,
    // CalendarModule,
    // CheckboxModule,
    // InputTextModule,
    ButtonModule,
    DialogModule,
    ProgressSpinnerModule
    // DropdownModule,
    // InputSwitchModule
  ]
})
/**@ignore */
export class MasterFormStylingModule {}
