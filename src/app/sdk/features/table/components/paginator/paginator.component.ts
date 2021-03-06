import { Component, Input, Output, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { pageSizeOptions } from './../../../../config/table.config';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {
    @Input() totalRecords = 0;
    @Input() currentPage = 1;
    @Input() pageSize = 0;
    @Input() searchQuery: string;
    @Input() staticTable = true;
    searchInfoText = '';
    @Output() onPageChange: EventEmitter<any> = new EventEmitter();
    @Output() onPageSizeChange: EventEmitter<any> = new EventEmitter();
    pageSizeOptions: Array<any> = pageSizeOptions;
    currentlyShowing: number;
    lastPage: number;
    previousPageDisabled: boolean;
    firstPageDisabled: boolean;
    nextPageDisabled: boolean;
    lastPageDisabled: boolean;
    previewPages: number[] = [];
    previewPageStyles: object[] = [];
    showPaginationControls() {
        return this.totalRecords > this.pageSize && !this.staticTable;
    }
    runOnPageChange(newPage: number): void {
        if (this.onPageChange) {
            this.onPageChange.emit([newPage]);
        }
    }
    runOnPageSizeChange(event): void {
        this.onPageSizeChange.emit([event.value]);
    }

    SetPaginationMeta = () => {
        // Calculating the last page from total records...
        this.lastPage = lastPageCalculator(this.totalRecords, this.pageSize);
        // Setting disabling logic for the buttons for first/last page buttons and previous/next buttons
        this.previousPageDisabled = this.currentPage === 1;
        this.firstPageDisabled = this.currentPage < 4;
        this.nextPageDisabled = this.currentPage === this.lastPage;
        this.lastPageDisabled = this.currentPage > this.lastPage - 3;
        // Calculating the no. of records being shown on current page...
        if (this.staticTable) {
            this.currentlyShowing = this.totalRecords;
        } else if (this.totalRecords > this.pageSize) {
            this.currentlyShowing = this.currentPage <= this.lastPage ? this.pageSize : this.totalRecords % this.pageSize;
        } else {
            this.currentlyShowing = this.totalRecords;
        }
        const record = this.totalRecords > 1 ? 'records' : 'record';
        this.searchInfoText = `Showing ${this.currentlyShowing} of ${this.totalRecords} ${record}${
            this.searchQuery ? ` for "${this.searchQuery}"` : ''
        }`;
        this.SetPreviewPages();
    };
    GoToFirst = () => {
        if (this.currentPage !== 1) {
            this.runOnPageChange(1);
        }
    };
    GoToPrevious = () => {
        if (this.currentPage !== 1) {
            this.runOnPageChange(this.currentPage - 1);
        }
    };
    GoToPage = page => {
        if (this.currentPage !== page) {
            this.runOnPageChange(page);
        }
    };
    GoToNext = () => {
        if (this.currentPage !== this.lastPage) {
            this.runOnPageChange(this.currentPage + 1);
        }
    };
    GoToLast = () => {
        if (this.currentPage !== this.lastPage) {
            this.runOnPageChange(this.lastPage);
        }
    };
    SetPreviewPages = () => {
        const lastPage = this.lastPage;
        const currentPage = this.currentPage;
        if (currentPage < 4 && lastPage >= 5) {
            // If there are 5 or more pages and current page is less than 4...
            const previewPages = [];
            for (let i = 1; i <= 4; i++) {
                previewPages.push(i);
            }
            this.previewPages = previewPages;
        } else if (currentPage > 3 && currentPage <= lastPage - 3) {
            // If current page is more than 3 and less than or equal to (lastPage - 3)
            this.previewPages = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
        } else if (currentPage > lastPage - 3 && lastPage > 4) {
            // If current page is greater than (lastPage - 3) and last page is more than 4...
            this.previewPages = [lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
        } else if (lastPage < 5) {
            const previewPages = [];
            for (let i = 1; i <= lastPage; i++) {
                previewPages.push(i);
            }
            this.previewPages = previewPages;
        }
        // Setting style for the page numbers...
        const previewPageStyles = this.previewPages.map(p => {
            if (p === this.currentPage) {
                return { 'background-color': 'rgba(0,0,0,1)', color: 'white', 'font-weight': 'bold' };
            } else {
                return { 'background-color': '', color: 'black', 'font-weight': '' };
            }
        });
        this.previewPageStyles = previewPageStyles;
    };

    constructor() {}

    ngOnInit() {
        this.SetPaginationMeta();
    }

    ngOnChanges(changes: SimpleChanges) {
        // Recalculating the pagination related info. on every change...
        this.SetPaginationMeta();
    }
}

/*
 * Function to calculate the last page...
 */
const lastPageCalculator = (totalRecords, pageSize) => {
    const lastPage = totalRecords / pageSize;
    if (totalRecords === 1) {
        return 1;
    } else {
        return Math.ceil(lastPage);
    }
};
