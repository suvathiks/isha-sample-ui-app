import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable()
export class FormCloseChecker {
  /**
   * Checks whether form can be closed safely
   */
  formCanClose(Form: FormGroup, formSubmitted: boolean): boolean {
    if ((Form.touched && formSubmitted) || !Form.touched) {
      return true;
    } else return false;
  }

  constructor() {}
}
