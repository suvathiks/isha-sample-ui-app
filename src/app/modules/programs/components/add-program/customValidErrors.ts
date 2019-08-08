import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator, FormControl } from '@angular/forms';
@Directive({
   selector: '[validCreditCard]',
   // We add our directive to the list of existing validators
   providers: [
     { provide: NG_VALIDATORS, useExisting: CreditCardValidator, multi: true }
   ]
})
export class CreditCardValidator implements Validator {
// This method is the one required by the Validator interface
validate(c: FormControl): ValidationErrors | null {
  // Here we call our static validator function 
  return CreditCardValidator.validateCcNumber(c);
}
static validateCcNumber(control: FormControl): ValidationErrors {

  if (! (control.value.startsWith('37') 
          || control.value.startsWith('4') 
          || control.value.startsWith('5'))
    ) {
       // Return error if card is not Amex, Visa or Mastercard     
       return {creditCard : 'Your credit card number is not from a supported credit card provider',
              msg:"invalid credi card 1"};
    } else if (control.value.length !== 16) {
       // Return error if length is not 16 digits
       return {creditCard : 'A credit card number must be 16-digit long',
       msg:"invalid credi card 2"};}
   // If no error, return null  
   return null;
}

static fRequired(control: FormControl): ValidationErrors {
  if (control.value === "") {
       // Return error if card is not Amex, Visa or Mastercard     
       return { creditCard: "rquired",
          msg:"Field is required"};
    }
   // If no error, return null  
   return null;
}

}