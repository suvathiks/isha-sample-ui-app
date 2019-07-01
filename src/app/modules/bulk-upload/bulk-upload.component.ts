import { Component, OnInit } from "@angular/core";
import * as Papa from "papaparse";
import { ContactsService } from "./../../services/api/contacts.service";
import { MatSnackBar } from "@angular/material";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
import { Observable } from "rxjs";
import { RecordErrorRendererComponent } from "./record-error.renderer";
import { isEqual } from "lodash";

const sampleCSV = [{"recordSourceId":"record_001","id":"1","firstName":"Hello","lastName":"World","dob":"2018-11-28T01:40:50.424Z","email":"abc@email.com","countryCode":"91","phoneNumber":"9323423213","city":"Coimbatore","state":"Tamil Nadu","country":"India","active":"1"},{"recordSourceId":"record_002","id":"2","firstName":"Hello","lastName":"World","dob":"2018-11-28T01:40:50.424Z","email":"abc@email.com","countryCode":"91","phoneNumber":"9323423213","city":"Coimbatore","state":"Tamil Nadu","country":"India","active":"1"},{"recordSourceId":"record_003","id":"3","firstName":"Hello","lastName":"World","dob":"2018-11-28T01:40:50.424Z","email":"abc@email.com","countryCode":"91","phoneNumber":"9323423213","city":"Coimbatore","state":"Tamil Nadu","country":"India","active":"1"},{"recordSourceId":"record_004","id":"4","firstName":"Hello","lastName":"World","dob":"2018-11-28T01:40:50.424Z","email":"abc@email.com","countryCode":"91","phoneNumber":"9323423213","city":"Coimbatore","state":"Tamil Nadu","country":"India","active":"1"},{"recordSourceId":"record_005","id":"5","firstName":"Hello","lastName":"World","dob":"2018-11-28T01:40:50.424Z","email":"abc@email.com","countryCode":"91","phoneNumber":"9323423213","city":"Coimbatore","state":"Tamil Nadu","country":"India","active":"1"}];

const tableId = "bulk-upload-input-table";

const recordTypes = [
  { index: 0, label: "All Records", value: "all" },
  { index: 1, label: "Failed Records", value: "failed" },
  { index: 2, label: "Added Records", value: "added" },
  { index: 3, label: "Skipped Records", value: "skipped" }
];

const colorCodes = {
  all: "black",
  added: "darkseagreen",
  skipped: "steelblue",
  failed: "red"
};

const emptyResponse = {
  message: "",
  totalRecords: 0,
  failedRecordIds: [],
  skippedRecordIds: [],
  addedRecordIds: [],
  failedRecordsDetails: []
};

@Component({
  selector: "jhi-bulk-upload",
  templateUrl: "./bulk-upload.component.html",
  styles: []
})
export class BulkUploadComponent implements OnInit {
  recordTypes = recordTypes;
  colorCodes = colorCodes;
  tableId = tableId;
  selectedRecordType = "all";
  columns: any[];
  uneditableColumns: any[];
  rows: any[];
  inputData: any[];
  response;
  skippedRecordIds: any[];
  failedRecordIds: any[];
  failedRecords: any[];
  addedRecordIds: any[];
  showUploadButton: boolean;
  showResponse: boolean;
  callInProgress: boolean;
  invalidInput: boolean;
  csvExportEnabled: boolean;
  tableHeightStatic = "500px";
  frameworkComponents = {
    recordErrorRenderer: RecordErrorRendererComponent
  };
  constructor(
    private contactsService: ContactsService,
    private snackBar: MatSnackBar,
    fb: FormBuilder
  ) {
    this.initializeVariables();
  }
  initializeVariables() {
    this.selectedRecordType = "all";
    this.columns = [];
    this.rows = [];
    this.inputData = [];
    this.response = emptyResponse;
    this.skippedRecordIds = [];
    this.failedRecordIds = [];
    this.failedRecords = [];
    this.addedRecordIds = [];
    this.showUploadButton = false;
    this.showResponse = false;
    this.callInProgress = false;
    this.invalidInput = false;
    this.csvExportEnabled = true;
  }
  ngOnInit() {}
  showUneditableColumns() {
    return this.showResponse && this.selectedRecordType !== "failed";
  }
  csvExportFilename() {
    return (
      this.labelOf(this.selectedRecordType) + " " + new Date().toLocaleString()
    );
  }
  /**
   * Source: http://jsfiddle.net/hybrid13i/JXrwM/
   */
  downloadCSVTemplate() {
    const CSV = Papa.unparse(sampleCSV);
    // Generate a file name
    const fileName = "Sample CSV Template";
    // this will remove the blank-spaces from the title and replace it with an underscore

    // Initialize file format you want csv or xls
    const uri = "data:text/csv;charset=utf-8," + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension

    // this trick will generate a temp <a /> tag
    const link = document.createElement("a");
    link.href = uri;

    // set the visibility hidden so it will not effect on your web-layout
    // link.style = 'visibility:hidden';
    link.download = fileName + ".csv";

    // this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  resetCSV() {
    this.initializeVariables();
    // this.responseUpdated(this.response);
  }
  uploadNewCSV() {
    const fileUploadButton: HTMLElement = document.getElementById(
      "fileUploadButton"
    ) as HTMLElement;
    fileUploadButton.click();
  }
  csv2Array(fileInput: any) {
    const file = fileInput.target.files[0];
    if (file) {
      this.resetCSV();
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = e => {
        const csv: string = reader.result.toString();
        const { columns, rows } = this.csvToColumnsRows(csv);
        this.columns = columns;
        this.rows = rows;
        this.inputData = rows;
        this.showUploadButton = true;
      };
    }
  }
  csvToColumnsRows(csv) {
    const rawJson = Papa.parse(csv).data;
    const modifiedJson = [];
    const headers = rawJson[0];
    for (let i = 1; i < rawJson.length - 1; i++) {
      const object = {};
      for (let j = 0; j < headers.length; j++) {
        object[headers[j]] = rawJson[i][j];
      }
      modifiedJson.push(object);
    }
    const finalOutput = {
      columns: this.convertHeadersToColumnDefs(headers),
      rows: modifiedJson
    };
    return finalOutput;
  }
  convertHeadersToColumnDefs = headers => {
    return headers.map(h => {
      const column = {
        field: h,
        headerName: h,
        editable: h === "recordSourceId" ? false : true,
        resizable: true
      };
      return column;
    });
  };
  labelOf(val) {
    const option = recordTypes.find(r => r.value === val);
    if (option) {
      return option.label;
    } else {
      return recordTypes[0].label;
    }
  }
  indexOf(val) {
    const option = recordTypes.find(r => r.value === val);
    if (option) {
      return option.index;
    } else {
      return 0;
    }
  }
  onSelectionChange(event) {
    const index = event.index;
    const option = recordTypes.find(r => r.index === index);
    let value;
    if (option) {
      value = option.value;
    } else {
      value = "all";
    }
    this.selectedRecordType = value;
    switch (value) {
      case "all":
        this.rows = this.inputData;
        break;
      case "failed":
        this.rows = this.failedRecords;
        break;
      default:
        break;
    }
  }
  generateTooltip = (params, c) => {
    const fieldName = params.colDef.field;
    const failedRecordsDetails = this.response.failedRecordsDetails;
    if (failedRecordsDetails.length > 0 && c.field === fieldName) {
      const failedRecord = failedRecordsDetails.find(f => {
        if (
          f.recordSourceId === params.data.recordSourceId &&
          f.errors.details.length > 0
        ) {
          const errorFields = f.errors.details.map(e => e.fieldName);
          return errorFields.includes(c.field);
        } else {
          return false;
        }
      });
      if (failedRecord) {
        const errorDetail = failedRecord.errors.details.find(
          d => d.fieldName === c.field
        );
        if (errorDetail.value === params.value) {
          return errorDetail.message;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
  responseUpdated(response) {
    // const res = {
    //     "message" : "All records saved already. No new records added now",
    //     "totalRecords" : 5,
    //     "addedRecordIds" : [ ],
    //     "skippedRecordIds" : [ null, null, null, null, null ],
    //     "failedRecordIds" : [ ],
    //     "failedRecordsDetails" : [ ]
    //     }
    this.response = response;
    this.failedRecordIds = response.failedRecordIds;
    this.skippedRecordIds = this.skippedRecordIds.concat(
      response.skippedRecordIds
    );
    this.addedRecordIds = this.addedRecordIds.concat(response.addedRecordIds);
    this.failedRecords = this.inputData.filter(r =>
      this.failedRecordIds.includes(r.recordSourceId)
    );
    if (this.failedRecordIds.length) {
      this.selectedRecordType = "failed";
    }
    this.columns = this.columns.map(c => {
      return {
        ...c,
        cellRenderer: "recordErrorRenderer",
        cellRendererParams: {
          addedRecordIds: this.addedRecordIds,
          skippedRecordIds: this.skippedRecordIds,
          failedRecordIds: this.failedRecordIds,
          failedRecordsDetails: this.response.failedRecordsDetails,
          colorCodes
        },
        tooltipValueGetter: params => {
          return this.generateTooltip(params, c);
        }
      };
    });
    this.uneditableColumns = this.columns.map(c => {
      return {
        ...c,
        editable: false
      };
    });
    this.tableHeightStatic = "450px";
    this.showResponse = true;
  }
  onSubmit() {
    let dataToSubmit = this.showResponse ? this.failedRecords : this.inputData;
    dataToSubmit = JSON.parse(
      JSON.stringify(dataToSubmit, function(key, value) {
        return value === "" ? null : value;
      })
    );
    if (dataToSubmit.length) {
      this.callInProgress = true;
      this.contactsService.bulkUploadContacts(dataToSubmit).subscribe(
        response => {
          this.callInProgress = false;
          this.responseUpdated(response.body);
        },
        error => {
          this.handleError();
        }
      );
    }
  }
  handleError() {
    this.snackBar.open("Something went wrong, please try again later", "OK", {
      duration: 5000
    });
    this.callInProgress = false;
    // const response = 
    // this.responseUpdated(response); // REMOVE
  }
}
