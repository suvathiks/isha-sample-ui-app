import { pageSizeOptions } from './../../config/table.config';

export class SearchParams {
    pageNumber = 1;
    pageSize: number = pageSizeOptions[0].value;
    sortField: string = null;
    sortOrder: string = null;
}

export interface ColWidth {
    table: string;
    colId: string;
    width: number;
}

export interface SdkTableColumn {
    field: string;
    headerName: string;
    cellRenderer?: Function | string;
    cellRendererFramework?: Object;
    cellRendererParams?: Object;
    pinned?: string;
    width?: number;
    tooltipValueGetter?: Function;
    sortable?: boolean;
    resizable?: boolean;
}
