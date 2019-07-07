import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CsvComponent } from "./csv.component";
import { TableModule } from "./../../sdk/features/table/table.module";
import { MessageService } from "primeng/api";
import { MasterFormModule } from "./../../sdk/features/master-form/master-form.module";
import { StylingModule } from '../../shared/styling.imports';
import { CsvRoutingModule } from './csv.routing';

@NgModule({
  declarations: [
    CsvComponent,
  ],
  imports: [
    CommonModule,
    CsvRoutingModule,
    StylingModule,
    TableModule,
  ],
  providers: []
})
export class CsvModule {}
