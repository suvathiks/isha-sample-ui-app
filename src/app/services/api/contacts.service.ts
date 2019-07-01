import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { makeUrl, endpoints } from "./../../sdk/config/api.config";
import { Contact } from "./../../models/contact.model";

@Injectable({
  providedIn: "root"
})
export class ContactsService {
  constructor(private http: HttpClient) {}

  fetchContacts(searchParams) {
    console.log("from fetchContacts", { searchParams });
    // ?_page=7&_limit=20
    const url =
      makeUrl(endpoints.contacts.fetch) +
      `?_page=${searchParams.pageNumber}&_limit=${
        searchParams.pageSize
      }&_sort=${searchParams.sortField}&_order=${searchParams.sortOrder}`;

    return this.http
      .get(url, { observe: "response" })
      .pipe(catchError((err, caught) => of(err)));
  }

  createContact(contactData: Contact) {
    let url = makeUrl(endpoints.contacts.fetch);
    return this.http
      .post(url, contactData, { observe: "response" })
      .pipe(catchError((err, caught) => of(err)));
  }

  updateContact(contactData: Contact) {
    let url = makeUrl(endpoints.contacts.fetch) + `/${contactData.id}`;
    return this.http.put(url, contactData, { observe: "response" }).pipe(
      catchError((err, caught) => {
        return of(err);
      })
    );
  }
  bulkUploadContacts(contactDataArray: Contact[]): Observable<any> {
    /**
     * Here you need to have an actual API service
     * that responds to bulk upload requests in the following format.
     */
    console.log('bulk-upload-input', {input: JSON.stringify(contactDataArray)});
    const response = {
      body: {
        message: "Some records failed!",
        totalRecords: 0,
        failedRecordIds: ["record_001"],
        skippedRecordIds: ["record_002"],
        addedRecordIds: ["record_003", "record_004", "record_005"],
        failedRecordsDetails: [
          {
            id: null,
            recordSourceId: "record_001",
            status: "FAIL",
            errors: {
              details: [
                {
                  fieldName: "dob",
                  message: "Invalid Date",
                  value: "2018-11-28T01:40:50.424Z"
                }
              ]
            },
            message: null,
            active: true
          }
        ]
      }
    };
      return of(response);
  }
}

export class SearchParams {
  searchQuery: string = "";
  pageNumber: number = 1;
  pageSize: number = 50;
  sortField: string = "contactId";
  sortOrder: string = "DESC";
  activeStatusFilter: string = "ACTIVE";
  filter: any = null;
  contactId: number | null = null;
  ownerId: number | null = null;
  dontSendPhoto: boolean = false;
}

export interface fetchResponse {
  totalRecords?: number;
  contacts?: Contact[];
  ok: boolean;
  message: string;
}

export interface addResponse {
  message: string;
  contactId?: number;
  code?: number;
  detailedMessage?: string;
}

export interface updateResponse {
  message: string;
  contactId?: number;
  code?: number;
  detailedMessage?: string;
}
