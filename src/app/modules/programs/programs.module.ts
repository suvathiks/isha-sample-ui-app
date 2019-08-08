import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsComponent } from './components/programs/programs.component';
import { AddProgramComponent } from './components/add-program/add-program.component';
import { FormFieldComponent } from './components/form-fields/form-fields.component';
import {StylingModule} from '../../shared/styling.imports';
import {MasterFormModule} from '../../sdk/features/master-form/master-form.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxsFormPluginModule} from '@ngxs/form-plugin';
import {TableModule} from '../../sdk/features/table/table.module';
import {ProgramsRoutingModule} from '../programs/programs.routing.module';
import { MessageService } from "primeng/api";
import {PendingChangesGuard} from '../programs/components/add-program/can-deactivate.guard';

@NgModule({
  declarations: [ProgramsComponent, AddProgramComponent, FormFieldComponent],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    CommonModule,
    StylingModule,
    MasterFormModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsFormPluginModule,
    TableModule,
  ],
  providers: [PendingChangesGuard, MessageService]
})
export class ProgramsModule { }
