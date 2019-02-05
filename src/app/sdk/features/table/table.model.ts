export class SearchParams {
  pageNumber: number;
  sortField: string;
  sortOrder: string;
  searchQuery: string;
  pageSize: number;
}

export interface ColWidth {
  table: string;
  colId: string;
  width: number;
}

export interface Column {
  field: string;
  headerName: string;
  cellRenderer?: Function | string;
  cellRendererFramework?: Object;
  pinned?: string;
  width?: number;
  tooltip?: Function;
  sortable?: boolean;
  resizable?: boolean;
}
