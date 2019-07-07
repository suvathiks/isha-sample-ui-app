import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StylingModule } from './styling.imports';
import { EditButtonRenderer } from './cell-renderers/cell-renderers.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
    declarations: [
        EditButtonRenderer
    ],
    imports: [
        StylingModule,
        AgGridModule.withComponents([EditButtonRenderer]),
    ],
    providers: []
})
export class SharedModule { }
