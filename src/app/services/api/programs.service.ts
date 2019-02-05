import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { makeUrl, endpoints } from "./../../sdk/config/api.config";
import { Program } from "./../../models/program.model";

@Injectable({
  providedIn: "root"
})
export class ProgramsService {
  constructor(private http: HttpClient) {}

  fetchPrograms(searchParams) {
    const url = makeUrl(endpoints.programs.fetch);
    return this.http.post(url, searchParams).pipe(catchError((err, caught) => of(err))
    );
  }

  createProgram(programData: Program) {
    let url = makeUrl(endpoints.programs.create);
    return this.http.post(url, programData).pipe(catchError((err, caught) => of(err))
    );
  }

  updateProgram(programData: Program) {
    let url = makeUrl(endpoints.programs.update);
    return this.http.post(url, programData).pipe(
     catchError((err, caught) => {
       return of(err)}
      )
    );
  }
}

export class SearchParams {
  searchQuery: string = "";
  pageNumber: number = 1;
  pageSize: number = 50;
  sortField: string = "programId";
  sortOrder: string = "DESC";
  activeStatusFilter: string = "ACTIVE";
  filter: any = null;
  programId: number | null = null;
  ownerId: number | null = null;
  dontSendPhoto: boolean = false;
}

export interface fetchResponse {
  totalRecords?: number;
  programs?: Program[];
  ok: boolean;
  message: string;
}

export interface addResponse {
  message: string;
  programId?: number;
  code?: number;
  detailedMessage?: string;
}

export interface updateResponse {
  message: string;
  programId?: number;
  code?: number;
  detailedMessage?: string;
}
