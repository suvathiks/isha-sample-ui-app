export class DisableNotification {
  static readonly type = "[FORM] DISABLE_NOTIFICATION";

  constructor(public formId: string) {}
}

export class SubmitForm {
  static readonly type = "[FORM] SUBMIT";

  constructor(public formId: string) {}
}

export class SetForm {
  static readonly type = "[FORM] SET";

  constructor(public formId: string, public recordId: number | "NEW") {}
}

export class ResetForm {
  static readonly type = "[FORM] RESET";

  constructor(public formId: string) {}
}

export const SUCCESS_NOTIFICATION = "SUCCESS_NOTIFICATION";
export const FAILURE_NOTIFICATION = "FAILURE_NOTIFICATION";
