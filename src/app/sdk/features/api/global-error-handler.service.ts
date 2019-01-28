import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class GlobalErrorHandler {
  constructor() {}
  /**
   * If an error occurs, we display it in the console with pertinent details
   * @param error the error object
   */
  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      const errorToShow = {
        status: error.status,
        message: error.message,
        details: error.error.message
      };
      console.error(`Backend returned this error => `, errorToShow);
    } else {
      // If error is not an instance of HttpErrorResponse...
      console.error(`An error occurred => "${error.message}"`);
    }
    throw new Error(error.message);
    // enable the following line to show notification...
    // this.errorNotifier.handleError(error);
  }
}
