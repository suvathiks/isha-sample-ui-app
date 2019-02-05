import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { makeUrl, endpoints } from "./../../sdk/config/api.config";
import { ConstantType, ConstantValue } from "./../../models/constant.model";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ConstantsService {
  constructor(private http: HttpClient) {}
  fetchConstantTypes() {
    const url = makeUrl(endpoints.constantTypes.fetch);
    return this.http.post(url, null).pipe(catchError((err) => {
       return of(err)
      }
      )
    );
  }
  fetchConstantValues() {
    const url = makeUrl(endpoints.constantValues.fetch);
    return this.http.post(url, null).pipe(
        catchError((err) => {
          return of(err);
        })
    );
  }
}
