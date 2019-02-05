export class Program {
  programId?: number | "NEW" = "NEW";
  active: 0 | 1 = 1;
  programName: string = "";
  programType: string = "";
  startDate: string = "";
  endDate: string = "";
  venue?: string = "";
  city: string = "";
  state: string = "";
  country: string = "";
  ownerId?: number = null;
}
