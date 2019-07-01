import { Component } from '@angular/core';
// <span style="color: orange;">{{params.value}}</span>
// Cell Renderers
@Component({
    selector: 'app-record-error-renderer',
    template: `
        <div
            *ngIf="cellFieldName !== 'recordSourceId'"
            [ngStyle]="{ background: cellBgColor, color: cellTextColor, 'font-weight': cellFontWeight }"
            style="font-size: 1.1em; padding: 5px;"
        >
            {{ params.value }}
        </div>
        <div
            *ngIf="cellFieldName === 'recordSourceId'"
            [ngStyle]="{ color: cellBgColor }"
            style="font-size: 1.2em; font-weight: bold; padding: 5px;"
        >
            {{ params.value }}
        </div>
    `
})
export class RecordErrorRendererComponent {
    params: any;
    row: any;
    cellTextColor = 'black';
    cellBgColor = 'transparent';
    cellFontWeight = 'normal';
    failedRecordsDetails: any[];
    cellFieldName: string;
    addedRecordIds: any[];
    skippedRecordIds: any[];
    failedRecordIds: any[];
    colorCodes;
    agInit(params: any): void {
        this.params = params;
        this.row = params.data;
        this.colorCodes = params.colorCodes;
        this.failedRecordsDetails = params.failedRecordsDetails;
        this.addedRecordIds = params.addedRecordIds;
        this.skippedRecordIds = params.skippedRecordIds;
        this.failedRecordIds = params.failedRecordIds;
        this.cellFieldName = params.colDef.field;
        this.assignCellColor();
    }
    cellIsNormal() {
        this.cellBgColor = 'transparent';
        this.cellTextColor = 'black';
        this.cellFontWeight = 'normal';
    }
    cellHasError() {
        this.cellBgColor = this.colorCodes['failed'];
        this.cellTextColor = 'white';
        this.cellFontWeight = 'bold';
    }
    errorCellHasBeenUpdated() {
        this.cellBgColor = 'orange';
        this.cellTextColor = 'white';
        this.cellFontWeight = 'bold';
    }
    cellIsAddedRecord() {
        this.cellBgColor = this.colorCodes['added'];
        this.cellTextColor = 'white';
        this.cellFontWeight = 'bold';
    }
    cellIsSkippedRecord() {
        this.cellBgColor = this.colorCodes['skipped'];
        this.cellTextColor = 'white';
        this.cellFontWeight = 'bold';
    }
    cellIsFailedRecord() {
        this.cellBgColor = this.colorCodes['failed'];
        this.cellTextColor = 'white';
        this.cellFontWeight = 'bold';
    }
    currentCellHasError() {
        if (this.failedRecordsDetails.length > 0) {
            const failedRecord = this.failedRecordsDetails.find(f => {
                if (f.recordSourceId === this.row.recordSourceId && f.errors.details.length > 0) {
                    const errorFields = f.errors.details.map(e => e.fieldName);
                    return errorFields.includes(this.cellFieldName);
                } else {
                    return false;
                }
            });
            if (failedRecord) {
                const errorDetail = failedRecord.errors.details.find(d => d.fieldName === this.cellFieldName);
                if (errorDetail.value === this.params.value) {
                    return true;
                } else {
                    this.errorCellHasBeenUpdated();
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    isAddedRecordId() {
        if (this.cellFieldName === 'recordSourceId' && this.addedRecordIds.includes(this.row.recordSourceId)) {
            return true;
        } else {
            return false;
        }
    }
    isSkippedRecordId() {
        if (this.cellFieldName === 'recordSourceId' && this.skippedRecordIds.includes(this.row.recordSourceId)) {
            return true;
        } else {
            return false;
        }
    }
    isFailedRecordId() {
        if (this.cellFieldName === 'recordSourceId' && this.failedRecordIds.includes(this.row.recordSourceId)) {
            return true;
        } else {
            return false;
        }
    }
    assignCellColor() {
        if (this.isFailedRecordId()) {
            this.cellIsFailedRecord();
        } else if (this.isAddedRecordId()) {
            this.cellIsAddedRecord();
        } else if (this.isSkippedRecordId()) {
            this.cellIsSkippedRecord();
        } else if (this.currentCellHasError()) {
            this.cellHasError();
        }
    }
    constructor() {}
}
