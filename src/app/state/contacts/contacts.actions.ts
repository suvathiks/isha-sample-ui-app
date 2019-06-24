import { Contact } from "./../../models/contact.model";
import { SearchParams } from "./../../services/api/contacts.service";

export class FetchContacts {
  static readonly type = "[PROGRAM] FETCH_REQUESTED";

  constructor(public searchParams: SearchParams) {}
}