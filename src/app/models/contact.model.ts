import {Phone, Email} from './shared.model';

export class Contact {
  id?: number | "NEW" = "NEW";
  firstName: string = "";
  lastName: string = "";
  dob: string = "";
  email: Email = new Email();
  phone: Phone = new Phone();
  city: string = "";
  state: string = "";
  country: string = "";
  active: 0 | 1 = 1;
}
