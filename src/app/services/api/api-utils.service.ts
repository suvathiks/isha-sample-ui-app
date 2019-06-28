import { HttpParams, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export const createRequestOption = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(key => {
      if (key !== "sort") {
        options = options.set(key, req[key]);
      }
    });
    if (req.sort && req.sort.forEach) {
      req.sort.forEach(val => {
        options = options.append("sort", val);
      });
    }
  }
  return options;
};

export const handleError = (error: HttpErrorResponse) => {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error("An error occurred:", error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` + `body was: ${error.error}`
    );
  }
  // return an observable with a user-facing error message
  return throwError("Something bad happened; please try again later.");
};
