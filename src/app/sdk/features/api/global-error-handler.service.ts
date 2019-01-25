import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class GlobalErrorHandler {
  constructor() {}
  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      const errorToShow = {
        status: error.status,
        message: error.message,
        details: error.error.message
      };
      console.error(`Backend returned this error => `, errorToShow);
    } else {
      console.error(`An error occurred => "${error.message}"`);
    }
    // Throwing error...
    throw error;
    // enable the following line to show notification...
    // this.errorNotifier.handleError(error);
  }
}
