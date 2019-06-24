export class Contact {
  id?: number | "NEW" = "NEW";
  firstName: string = "";
  lastName: string = "";
  dob: string = "";
  email: string = "";
  phone: string = "";
  city: string = "";
  state: string = "";
  country: string = "";
  active: 0 | 1 = 1;
}
