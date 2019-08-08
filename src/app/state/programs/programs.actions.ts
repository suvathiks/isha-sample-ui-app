import { Program } from "./../../models/program.model";
import { SearchParams } from "./../../services/api/programs.service";

export class FetchPrograms {
  static readonly type = "[PROGRAM] FETCH_REQUESTED";

  constructor(public searchParams: SearchParams) {}
}
