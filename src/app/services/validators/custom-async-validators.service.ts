import { Injectable } from "@angular/core";
import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormGroup
} from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { of } from "rxjs";
import { CDIService } from "./../cdi/cdi.service";

@Injectable({ providedIn: "root" })
export class CustomAsyncValidators {
  constructor(private cdiService: CDIService) {}
  phoneAsyncValidator(
    phoneCodeLabel,
    phoneLabel,
    options = { required: false }
  ): AsyncValidatorFn {
    return (
      form: FormGroup
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      const { required } = options;
      const phoneControl = form.controls[phoneLabel];
      const code = form.controls[phoneCodeLabel].value;
      const phone = phoneControl.value;
      const phoneToBeValidated = `+${code}${phone}`;
      const phoneControlIdentifier = phoneLabel + "Invalid";
      if (phoneToBeValidated.length > 1) {
        return this.cdiService.validatePhone(phoneToBeValidated).pipe(map(res => {
          console.log('phone validation response from asyncCustom', {res});
          let validationResponse = res.body.phoneNumbers.find(
            e => e.number === phoneToBeValidated
          );
          validationResponse = validationResponse
            ? validationResponse
            : { valid: false, errorMsg: null };
          const notRequiredButOneExists = !required && (!!phone || !!code); // Checks to see if it is not required but at least one of the values is present
          const requiredAndBothExist = required && !!phone && !!code; // Checks to see if it is a required field and both values are present
          if (
            (!validationResponse.valid &&
              (notRequiredButOneExists || requiredAndBothExist)) ||
            (!requiredAndBothExist && required)
          ) {
            // Sets error if response is invalid or if it is required but not both of them are filled
            // const phoneCodeControlIdentifier = phoneCodeLabel + 'Invalid';
            // form.controls[phoneCodeLabel].setErrors({ incorrect: true });
            form.controls[phoneLabel].setErrors({ incorrect: true });
            console.log('phone number is BAAAAADDDDDD!!!!!', {validationResponse, required, notRequiredButOneExists, requiredAndBothExist});
            return { [phoneControlIdentifier]: true };
          } else {
            return null;
          }
        }));
      } else {
        const promise = new Promise((resolve, reject) => {
          resolve(required ? { [phoneControlIdentifier]: true } : null);
        });
        return promise;
      }
    };
  }
  emailAsyncValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      if (control.value) {
          console.log('from email validate async', {value: control.value});
        return this.cdiService.validateEmail(control.value).pipe(map(res => {
          let validationResponse = res.body.emailIds.find(
            e => e.emailId === control.value
          );
          validationResponse = validationResponse
            ? validationResponse
            : { valid: false, errorMessage: null };
          return !validationResponse.valid && control.value
            ? { emailInvalid: true }
            : null;
        }));
      } else {
        const promise = new Promise((resolve, reject) => {
          resolve(null);
        });
        return promise;
      }
    };
  }
}
