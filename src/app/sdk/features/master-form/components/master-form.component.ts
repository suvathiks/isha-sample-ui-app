import {
  Component,
  OnInit,
  Input,
  HostListener,
  TemplateRef,
  ContentChild
} from "@angular/core";
import { Observable } from "rxjs";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Store, Select } from "@ngxs/store";
import { ComponentCanDeactivate } from "./../services/can-deactivate.guard";
import {
  SetForm,
  SubmitForm,
  ResetForm,
  DisableNotification,
  FAILURE_NOTIFICATION,
  SUCCESS_NOTIFICATION
} from "./../master-form.actions";
import { FormNotification } from "./../form-notifications/notification.service";
import { FormCloseChecker } from "./../services/form-close-checker.service";
@Component({
  selector: "app-master-form",
  templateUrl: "./master-form.component.html",
  styleUrls: ["./master-form.component.scss"]
})
export class MasterFormComponent implements OnInit {
  // ComponentCanDeactivate {
  @ContentChild(TemplateRef) formRef;
  @Input()
  formId: string;
  @Input()
  formTitle: String;
  @Input()
  recordId: number | "NEW";
  @Input()
  Form: FormGroup;
  @Input()
  formSubmitted: boolean;
  @Input()
  submittingForm: boolean;
  @Input()
  formCloseNavigationRoute: string;
  @Input()
  ngxsForm;
  @Input()
  showNotification: string;
  @Input()
  notificationMessage: string;

  displayDialog: boolean = false;
  showDialog() {
    this.displayDialog = true;
  }

  initiateNotifications(showNotification, notificationMessage) {
    if (showNotification === SUCCESS_NOTIFICATION) {
      this.formNotification.showNotification(notificationMessage, true);
      this.router.navigateByUrl(this.formCloseNavigationRoute);
    } else if (showNotification === FAILURE_NOTIFICATION) {
      this.formNotification.showNotification(notificationMessage, false);
    }
    this.store.dispatch(new DisableNotification(this.formId));
  }

  setForm(formId: string, recordId: number | "NEW"): void {
    this.store.dispatch(new SetForm(formId, recordId));
  }

  submitForm() {
    (<any>Object).values(this.Form.controls).forEach(control => {
      control.markAsDirty();
    });

    if (this.Form.status === "INVALID") {
      return;
    }
    this.store.dispatch(new SubmitForm(this.formId));
  }
  cancelForm() {
    this.router.navigate([this.formCloseNavigationRoute]);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // Clearing form on unmount
    this.store.dispatch(new ResetForm(this.formId));
  }

  ngOnChanges(changes: any): void {
    if (changes.showNotification || changes.notificationMessage) {
      setTimeout(() => {
        // Setting timeout here in order to prevent initiating notification
        // in the middle of a rerender
        this.showNotification = changes.showNotification.currentValue;
        this.initiateNotifications(
          this.showNotification,
          this.notificationMessage
        );
        if (changes.notificationMessage) {
          this.notificationMessage = changes.notificationMessage.currentValue;
        }
      });
    }
  }

  /**
   * Checks whether form can be closed safely
   */
  formCanClose(): boolean {
    return this.formCloseChecker.formCanClose(this.Form, this.formSubmitted);
  }

  constructor(
    public router: Router,
    private store: Store,
    private messageService: MessageService,
    private formNotification: FormNotification,
    private formCloseChecker: FormCloseChecker
  ) {
    this.setForm(this.formId, this.recordId);
  }
}
