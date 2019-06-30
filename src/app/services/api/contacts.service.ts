import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
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
      `?_page=${searchParams.pageNumber}&_limit=${searchParams.pageSize}`;

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
