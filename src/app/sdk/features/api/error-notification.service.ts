import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class ErrorNotification {
  constructor(public snackbar: MatSnackBar) {}

  public handleError(err: any) {
    this.snackbar.open("Oops! Something went wrong...", "Dismiss", {
      panelClass: "negative-notification",
      horizontalPosition: "start",
      verticalPosition: "bottom",
      duration: 10000
    });
  }
}
