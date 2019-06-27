export interface keyTextValue {
  key: string;
  text: string;
  value: string;
  constantType?: string;
}

export class Emails {
  details: Email[];
  constructor() {
    this.details = [];
  }
}

export class Email {
  emailId: string;
  constructor(emailId?) {
    this.emailId = emailId;
  }
}

export class Phones {
  details: Phone[];
  constructor() {
    this.details = [];
  }
}

export class Phone {
  countryCode: string;
  phoneNumber: string;
  constructor(phoneNumber?, countryCode?) {
    this.countryCode = countryCode;
    this.phoneNumber = phoneNumber;
  }
}
