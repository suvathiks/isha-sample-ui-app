import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { makeUrl, endpoints } from "./../../sdk/config/api.config";
import { Constant } from "./../../models/constant.model";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ConstantsService {
  constructor(private http: HttpClient) {}
  fetchConstants() {
    const url = makeUrl(endpoints.constants.fetch);
    console.log('from constants service', {url});
    return this.http.get(url).pipe(
        catchError((err) => {
          return of(err);
        })
    );
  }
}
