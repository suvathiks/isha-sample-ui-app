export interface keyTextValue {
  key: string;
  text: string;
  value: string;
  constantType?: string;
}

export class Emails {
  details: Email[] = [];
  constructor() {
    this.details = [];
  }
}

export class Email {
  emailId: string;
  constructor(emailId=null) {
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
  constructor(phoneNumber = null, countryCode = null) {
    this.countryCode = countryCode;
    this.phoneNumber = phoneNumber;
  }
}

export class EmailIdsObj {
  emailIds: EmailId[];
  constructor() {
    this.emailIds = [];
  }
}

export class EmailId {
  emailId: string = null;
  valid?: string = null;
  errorMessage?: string;
  constructor(emailId?: string) {
    this.emailId = emailId;
  }
}
