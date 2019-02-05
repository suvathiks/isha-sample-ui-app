import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

// To enable notification styling import notification.style.scss into the main styles.scss file
const positiveNotificationStyle = "positive-notification";
const negativeNotificationStyle = "negative-notification";

@Injectable()
export class FormNotification {
  constructor(private snackbar: MatSnackBar) {}

  public showNotification(message: string, positive: boolean): void {
    const panelClass = positive
      ? positiveNotificationStyle
      : negativeNotificationStyle;
    const announcement = positive ? message : "Saving form unsuccessful...";
    this.snackbar.open(announcement, "Dismiss", {
      panelClass: panelClass,
      horizontalPosition: "start",
      verticalPosition: "bottom",
      duration: 5000
    });
  }
}
