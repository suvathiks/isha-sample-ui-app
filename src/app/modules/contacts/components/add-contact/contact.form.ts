import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { required, maxLength9, dateRangeValidator } from "./validators";

@Injectable({
  providedIn: "root"
})
export class ContactFormCreator {
  constructor(private fb: FormBuilder) {}
  generateContactForm = Contact => {
    const ContactForm = this.fb.group({
      id: [Contact.id],
      firstName: [Contact.firstName],
      lastName: [Contact.lastName],
      email: [Contact.email.emailId,
        [],
        // [this.customAsyncValidators.emailAsyncValidator()]
      ],
      dob: [Contact.dob],
      phoneDetails: this.fb.group(
        {
          countryCode: [
            Contact.phone.countryCode
          ],
          phoneNumber: [
            Contact.phone.phoneNumber
          ]
        },
        {
          // asyncValidator: [
          //   this.customAsyncValidators.phoneAsyncValidator(
          //     "personPhoneCC",
          //     "personPhone"
          //   )
          // ]
        }
      ),
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
