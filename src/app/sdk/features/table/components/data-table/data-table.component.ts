import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { SdkTableColumn, ColWidth, SearchParams } from './../../table.model';
import { setColumnWidthsFromLocalStorage, updateColumnWidth, customWidthsExist } from './../../table.functions';
import { pageSizeOptions } from './../../../../config/table.config';
import { get } from 'lodash';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
    private noRecordsMessage = `<div class="no-rows-message">No records to display</div>`;
    private gridApi;
    private columnDefs: any[];
    private gridColumnApi;
    overlayLoadingTemplate = `<div class="loading-animation">Loading...</div>`;
    overlayNoRowsTemplate = `<div></div>`;
    private originalSearchParams;
    private pageSizeOptions: Array<Object> = pageSizeOptions;
    staticTable = true;
    @Input() frameworkComponents: Object;
    @Input() tableId = '';
    @Input() addRoute = '';
    @Input() addLabel = '';
    @Input() searchParams: SearchParams = new SearchParams();
    @Output() fetchDataCallback: EventEmitter<any> = new EventEmitter();
    @Input() columns: SdkTableColumn[] = [];
    @Input() rows: any[] = [];
    @Input() totalRecords = 0;
    @Input() rowHeight = 40;
    @Input() getRowHeight = null;
    @Input() tableHeightStatic;
    @Input() tableHeightClearanceInPx = 0;
    @Input() isFullWidthCell: boolean;
    @Input() fullWidthCellRenderer;
    @Input() fullWidthCellRendererParams;
    @Input() csvExportEnabled = false;
    @Input() csvExportFilename: string = new Date().toString();
    @Input() csvColumns: string[] = [];
    private tableHeight = `100vh - var(--topnav-height) - var(--paginator-height) - var(--search-input-height) - var(--generic-padding)`;
    sortModel = [];
    currentSearchQuery = '';
    currentPage = 1;
    lastPage = 1;
    currentlyShowing = 0;
    previewPages: number[] = [];
    previewPageStyles: object[] = [];
    isFetchingCSVDownload = false;
    csvDownloadReady = false;
    calculateTableHeight = () => {
        if (this.tableHeightStatic) {
            return this.tableHeightStatic;
        } else {
            return `calc(${this.tableHeight} - ${this.tableHeightClearanceInPx}px)`;
        }
    };
    fetchCSVData() {
        this.isFetchingCSVDownload = true;
        this.searchParams.pageSize = this.totalRecords;
        this.searchParams.pageNumber = 1;
        this.fetchData();
    }
    /**
     * When happens when CSV export is clicked..
     * WARNING: Make sure that you're not using cell-renderes with async functions.
     * This won't work with ASYNC functions in cell renderers!!!!
     */
    onCSVExport() {
        const params = {
            skipHeader: false,
            columnGroups: false,
            skipFooters: false,
            skipGroups: false,
            skipPinnedTop: false,
            skipPinnedBottom: false,
            onlySelected: false,
            allColumns: this.csvColumns.length === 0 ? true : false,
            columnKeys: this.csvColumns.length > 0 ? this.csvColumns : null,
            suppressQuotes: true,
            fileName: this.csvExportFilename,
            processCellCallback(cell) {
                let cellVal = cell.value;
                if (get(cell, 'column.colDef.cellRenderer')) {
                    cellVal = cell.column.colDef.cellRenderer({ value: cell.value, data: cell.value });
                }
                return cellVal;
            }
        };
        this.gridApi.exportDataAsCsv(params);
    }
    fetchData() {
        if (this.fetchDataCallback.observers.length) {
            this.staticTable = false;
            // If a callback function exists, then show loadingOverlay and then emit that callback function
            this.showLoadingOverlay();
            this.fetchDataCallback.emit([this.searchParams]);
        }
    }
    onSortChanged = event => {
        const originalSortObject = this.originalSearchParams;
        const tableSortObject = event.api.getSortModel();
        let newSortField = '';
        let newSortOrder = '';
        if (tableSortObject.length) {
            // Getting exact fieldName in case colId is rendererd differently
            const colId = tableSortObject[0].colId;
            const column = event.columnApi.columnController.allDisplayedColumns.find(c => c.colId === colId);
            //
            newSortField = column.colDef.field;
            newSortOrder = tableSortObject[0].sort;
        }
        if (!newSortField || (!newSortOrder && originalSortObject)) {
            newSortField = originalSortObject.sortField;
            newSortOrder = originalSortObject.sortOrder;
        }
        this.searchParams.sortField = newSortField;
        this.searchParams.sortOrder = newSortOrder;
        this.searchParams.pageNumber = 1;
        this.fetchData();
    };
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.overlayNoRowsTemplate = this.noRecordsMessage;
        this.fetchData();
    }

    onFirstDataRendered(event) {
        this.gridColumnApi = event.columnApi;
        if (customWidthsExist(this.tableId)) {
            // Setting custom widths for columns from localStorage
            this.columns = setColumnWidthsFromLocalStorage(this.tableId, this.columns);
        } else {
            this.sizeColumnsToFit();
        }
    }
    onRowDataChanged(event) {
        if (this.csvDownloadReady) {
            this.csvDownloadReady = false;
        }
        if (this.isFetchingCSVDownload) {
            this.isFetchingCSVDownload = false;
            this.csvDownloadReady = true;
        }
    }
    autoSizeAll() {
        const allColumnIds = this.gridColumnApi.getAllColumns().map(col => col.colId);
        this.gridColumnApi.autoSizeColumns(allColumnIds);
    }
    sizeColumnsToFit() {
        // this.gridColumnApi.sizeColumnsToFit();
    }
    showLoadingOverlay() {
        if (this.gridApi !== undefined) {
            this.gridApi.showLoadingOverlay();
        }
    }
    hideOverlays() {
        if (this.gridApi) {
            this.gridApi.hideOverlay();
        }
    }
    returnNewPageNumber(page) {
        if (page !== undefined) {
            this.searchParams.pageNumber = page;
            this.fetchData();
        }
    }
    onPageSizeChange(newPageSize) {
        this.searchParams.pageSize = newPageSize;
        this.fetchData();
    }
    onColumnResize = event => {
        if (event.columns.length && this.tableId) {
            event.columns.map(c => {
                const colWidth: ColWidth = {
                    table: this.tableId,
                    colId: c.colDef.field,
                    width: c.actualWidth
                };
                updateColumnWidth(colWidth);
            });
        }
    };
    onColumnReorder = event => {
        /** If you wish, you can uncomment the following lines and
         * save it in localStorage, just like the column widths.
         */
        // const newOrder = this.gridColumnApi
        //   .getAllGridColumns()
        //   .map(col => col.colId);
        //
    };

    constructor(private sanitizer: DomSanitizer) {}

    ngOnChanges() {}
    ngOnInit() {
        this.originalSearchParams = JSON.parse(JSON.stringify(this.searchParams));
    }
}
