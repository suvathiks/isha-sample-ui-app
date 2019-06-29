import { Phone } from './shared.model';

export class Contact {
  id?: number | "NEW" = "NEW";
  firstName: string = "";
  lastName: string = "";
  dob: string = "";
  email: string = "";
  phoneDetails: Phone = new Phone();
  city: string = "";
  state: string = "";
  country: string = "";
  active: 0 | 1 = 1;
}
const newContact = new Contact();
console.log('new contact', {contact: newContact});