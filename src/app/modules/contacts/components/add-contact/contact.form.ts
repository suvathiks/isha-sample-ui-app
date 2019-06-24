import {Injectable} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  required,
  maxLength9,
  dateRangeValidator
} from "./validators";

@Injectable({
  providedIn: "root"
})
export class ContactFormCreator {
  constructor(private fb: FormBuilder) {}
  generateContactForm = Contact => {
    const ContactForm = this.fb.group({
      active: [1],
      ContactId: [Contact.ContactId],
      ContactName: [Contact.ContactName],
    //   ContactName: [Contact.ContactName, [Validators.required]],
      ContactType: [Contact.ContactType, Validators.required],
      startDate: [
        parseDateForCalendar(Contact.startDate),
        [Validators.required, dateRangeValidator]
      ],
      endDate: [
        parseDateForCalendar(Contact.endDate),
        [Validators.required, dateRangeValidator]
      ],
      venue: [Contact.venue],
      city: [Contact.city, Validators.required],
      state: [Contact.state, Validators.required],
      country: [Contact.country, Validators.required]
    });
    return ContactForm;
  };
}

const parseDateForCalendar = (dateString: string) => {
  return dateString ? new Date(dateString) : dateString;
};
