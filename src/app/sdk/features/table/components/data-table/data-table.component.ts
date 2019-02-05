import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding
} from "@angular/core";
import { Observable } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";
import { Column, ColWidth, SearchParams } from "./../../table.model";
import {
  setColumnWidthsFromLocalStorage,
  updateColumnWidth,
  customWidthsExist,
} from "./../../table.functions";
import { pageSizeOptions } from "./../../table.constants";

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.scss"]
})
export class DataTableComponent {
  private noRecordsMessage = `<div class="no-rows-message">No records to display</div>`;
  private gridApi;
  private columnDefs: any[];
  private gridColumnApi;
  private overlayLoadingTemplate = `<div class="loading-animation"><img src="assets/logo/logoMin.png"  height="45px" alt="Loading..." /></div>`;
  private overlayNoRowsTemplate = `<div></div>`;
  private originalSearchParams;
  private pageSizeOptions: Array<Object> = pageSizeOptions;
  @Input()
  frameworkComponents: Object;
  @Input()
  tableId: string = "";
  @Input()
  addRoute: string = "";
  @Input()
  addLabel: string = "";
  @Input()
  searchParams: SearchParams;
  @Output()
  fetchDataCallback: EventEmitter<any> = new EventEmitter();
  @Input()
  columns: Column[] = [];
  @Input()
  rows: any[] = [];
  @Input()
  totalRecords: number = 0;
  @Input()
  tableHeight: string = "80vh";
  @Input()
  rowHeight: number = 36;
  sortModel = [];
  currentSearchQuery: string = "";
  currentPage: number = 1;
  lastPage: number = 1;
  currentlyShowing: number = 0;
  previewPages: number[] = [];
  previewPageStyles: object[] = [];
  //
  callSearchQuery() {
    if (this.searchParams.searchQuery !== this.currentSearchQuery) {
      this.fetchData();
    }
  }
  fetchData() {
    if (this.fetchDataCallback) {
      this.showLoadingOverlay();
      this.currentSearchQuery = this.searchParams.searchQuery;
      this.fetchDataCallback.emit([this.searchParams]);
    }
  }
  onSortChanged = event => {
    const originalSortObject = this.originalSearchParams;
    const tableSortObject = event.api.getSortModel();
    let newSortField = "";
    let newSortOrder = "";
    if (tableSortObject.length) {
      // Getting exact fieldName in case colId is rendererd differently
      const colId = tableSortObject[0].colId;
      const column = event.columnApi.columnController.allDisplayedColumns.find(
        c => c.colId === colId
      );
      //
      newSortField = column.colDef.field;
      newSortOrder = tableSortObject[0].sort.toUpperCase();
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
      this.columns = setColumnWidthsFromLocalStorage(
        this.tableId,
        this.columns
      );
    } else this.autoSizeAll();
  }
  autoSizeAll() {
    let allColumnIds = this.gridColumnApi.getAllColumns().map(col => col.colId);
    this.gridColumnApi.autoSizeColumns(allColumnIds);
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
  onColumnResize = event => {
    if (event.columns.length && this.tableId) {
      event.columns.map(c => {
        let colWidth: ColWidth = {
          table: this.tableId,
          colId: c.colId,
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

  /*
   * This is to set CSS custom variable that will be used to calculate table height
   */
  @HostBinding("attr.style")
  public get valueAsStyle(): any {
    return this.sanitizer.bypassSecurityTrustStyle(
      `--table-height: ${this.tableHeight}`
    );
  }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.originalSearchParams = JSON.parse(JSON.stringify(this.searchParams));
  }
}

const lastPageCalculator = (totalRecords, pageSize) => {
  if (totalRecords === 0) {
    return 1;
  } else {
    let lastPage = totalRecords / pageSize;
    return Math.ceil(lastPage);
  }
};
