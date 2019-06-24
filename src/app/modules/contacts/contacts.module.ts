import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { AgGridModule } from "ag-grid-angular";
import { PendingChangesGuard } from "./components/add-contact/can-deactivate.guard";

import { ContactsComponent } from "./components/contacts/contacts.component";
import { AddEditContactComponent } from "./components/add-contact/add-contact.component";
import { TableModule } from "./../../sdk/features/table/table.module";
import { ContactsRoutingModule } from "./contacts.routing";
import { ContactsStylingModule } from "./contacts.styling.imports";
import { MessageService } from "primeng/api";
import { FormFieldComponent } from "./components/form-fields/form-fields.component";
import { MasterFormModule } from "./../../sdk/features/master-form/master-form.module";
import { EditButtonRenderer } from "./components/cell-renderers/cell-renderers.component";

@NgModule({
  declarations: [
    ContactsComponent,
    AddEditContactComponent,
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
    ContactsStylingModule,
    ContactsRoutingModule
  ],
  providers: [PendingChangesGuard, MessageService]
})
export class ContactsModule {}
