import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableStylingModule } from './table.styling.imports';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [DataTableComponent, PaginatorComponent],
    imports: [CommonModule, AgGridModule.withComponents([]), RouterModule, FormsModule, ReactiveFormsModule, TableStylingModule],
    exports: [DataTableComponent, PaginatorComponent],
    providers: []
})
export class TableModule {}
