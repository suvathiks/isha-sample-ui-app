import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { required, maxLength9, dateRangeValidator } from "./validators";
import { CustomAsyncValidators } from "./../../../../services/validators/custom-async-validators.service";

@Injectable({
  providedIn: "root"
})
export class ContactFormCreator {
  constructor(
    private fb: FormBuilder,
    private customAsyncValidators: CustomAsyncValidators
  ) {}
  generateContactForm = Contact => {
    const ContactForm = this.fb.group({
      id: [Contact.id],
      firstName: [Contact.firstName],
      lastName: [Contact.lastName],
      email: [
        Contact.email,
        [],
        [this.customAsyncValidators.emailAsyncValidator()]
      ],
      dob: [Contact.dob],
      phoneDetails: this.fb.group(
        {
          countryCode: [Contact.phoneDetails.countryCode],
          phoneNumber: [Contact.phoneDetails.phoneNumber]
        },
        {
          asyncValidator: [
            this.customAsyncValidators.phoneAsyncValidator(
              "countryCode",
              "phoneNumber"
            )
          ]
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
