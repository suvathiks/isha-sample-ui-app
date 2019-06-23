import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { AgGridModule } from "ag-grid-angular";
import { PendingChangesGuard } from "./components/add-program/can-deactivate.guard";

import { ProgramsComponent } from "./components/programs/programs.component";
import { AddEditProgramComponent } from "./components/add-program/add-program.component";
import { TableModule } from "./../../sdk/features/table/table.module";
import { ProgramsRoutingModule } from "./programs.routing";
import { ProgramsStylingModule } from "./programs.styling.imports";
import { MessageService } from "primeng/api";
import { FormFieldComponent } from "./components/form-fields/form-fields.component";
import { MasterFormModule } from "./../../sdk/features/master-form/master-form.module";
import { EditButtonRenderer } from "./components/cell-renderers/cell-renderers.component";

@NgModule({
  declarations: [
    ProgramsComponent,
    AddEditProgramComponent,
    FormFieldComponent,
    EditButtonRenderer
  ],
  imports: [
    CommonModule,
    MasterFormModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsFormPluginModule,
    TableModule,
    AgGridModule.withComponents([EditButtonRenderer]),
    ProgramsStylingModule,
    ProgramsRoutingModule
  ],
  providers: [PendingChangesGuard, MessageService]
})
export class ProgramsModule {}
