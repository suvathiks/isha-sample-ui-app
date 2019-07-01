import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RecordErrorRendererComponent } from "./record-error.renderer";
import { BulkUploadComponent } from "./bulk-upload.component";
import { TableModule } from "./../../sdk/features/table/table.module";
import { AgGridModule } from "ag-grid-angular";
import { BulkUploadRoutingModule } from './bulk-upload.routing';
import { StylingModule } from '../../shared/styling.imports';

@NgModule({
  declarations: [BulkUploadComponent, RecordErrorRendererComponent],
  imports: [
    CommonModule,
    TableModule,
    BulkUploadRoutingModule,
    StylingModule,
    AgGridModule.withComponents([RecordErrorRendererComponent])
  ],
  providers: []
})
export class BulkUploadModule {}
