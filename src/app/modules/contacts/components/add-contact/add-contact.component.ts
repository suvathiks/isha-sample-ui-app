import { Component, OnInit, HostListener } from "@angular/core";
import { Observable } from "rxjs";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Store, Select } from "@ngxs/store";
import { ComponentCanDeactivate } from "./can-deactivate.guard";
import {
  ContactState,
  ContactStateModel,
  defaultContactState,
  formIdContact
} from "./../../../../state/contacts/contacts.state";
import { Contact } from "./../../../../models/contact.model";
import { ConstantParsingService } from "./../../../../services/constant-parsing.service";
import { ConstantState } from "./../../../../state/constants/constants.state";
import { country } from "./../../../../shared/constants/constantTypeCodes";
import { Constant } from "./../../../../models/constant.model";
import { ContactFormCreator } from "./contact.form";
import { FormCloseChecker } from "./../../../../sdk/features/master-form/services/form-close-checker.service";

export const formRouteContact = "/contacts/add-edit";
export const formCloseNavigationRouteContact = "/contacts";
export const formTitle = "Contact Information";

@Component({
  selector: "app-add-contact",
  templateUrl: "./add-contact.component.html",
  styleUrls: ["./add-contact.component.scss"]
})
export class AddEditContactComponent implements OnInit {
  formId: string = formIdContact;
  formTitle: string = formTitle;
  formCloseNavigationRoute: string = formCloseNavigationRouteContact;
  ContactForm: FormGroup = this.contactFormCreator.generateContactForm(
    new Contact()
  );
  submittingForm: boolean = false;
  formSubmitted: boolean = false;
  showNotification: string;
  notificationMessage: string;
  @Select(ContactState.state) contactState$: Observable<ContactStateModel>;
  contactState: ContactStateModel = new ContactStateModel();
  @Select(ConstantState.constantValues)
  constantValues$: Observable<Constant[]>;
  constantValues: Constant[] = [];
  editingContactForm: Contact;
  recordId: number | "NEW";
  countryOptions;
  fieldParams = {};

  prepareDropdownOptions(list) {
    let options = [
      {
        label: "Select",
        value: ""
      }
    ];
    list.map(item => {
      options = [
        ...options,
        {
          label: item.text,
          value: item.key
        }
      ];
    });
    return options;
  }

  /**
   * Checks whether form can be closed safely
   */
  formCanClose(): boolean {
    return this.formCloseChecker.formCanClose(
      this.ContactForm,
      this.formSubmitted
    );
  }

  ngOnInit(): void {}

  constructor(
    public router: Router,
    private messageService: MessageService,
    private store: Store,
    private constantService: ConstantParsingService,
    private contactFormCreator: ContactFormCreator,
    private formCloseChecker: FormCloseChecker
  ) {
    this.contactState$.subscribe(latestState => {
      this.editingContactForm = latestState.contactForm.model;
      this.submittingForm = latestState.submittingForm;
      this.formSubmitted = latestState.formSubmitted;
      this.recordId = this.editingContactForm.id;
      this.showNotification = latestState.showNotification;
      this.notificationMessage = latestState.notificationMessage;
      this.contactState = latestState;
    });
    this.ContactForm = this.contactFormCreator.generateContactForm(
      this.editingContactForm
    );

    this.constantValues$.subscribe(value => {
      this.constantValues = value;
      let countries = this.constantService.getConstantValues(
        this.constantValues,
        country
      );
      this.countryOptions = this.prepareDropdownOptions(countries);
    });
  }

  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener("window:beforeunload")
  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    return this.formCanClose();
  }
}
