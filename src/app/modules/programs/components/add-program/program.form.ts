import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { required, maxLength9, dateRangeValidator } from "./validators";
import { CustomAsyncValidators } from "./../../../../services/validators/custom-async-validators.service";

@Injectable({
  providedIn: "root"
})
export class ProgramFormCreator {
  constructor(
    private fb: FormBuilder,
    private customAsyncValidators: CustomAsyncValidators
  ) {}
  generateProgramForm = Program => {
    const ProgramForm = this.fb.group({
      id: [Program.id],
      programName: [Program.programName],
      startDate: [Program.startDate],
      endDate: [Program.endDate],

      venue: [Program.venue, Validators.required],
      city: [Program.city, Validators.required],
      state: [Program.state, Validators.required],
      country: [Program.country, Validators.required]
    });
    return ProgramForm;
  };
}

const parseDateForCalendar = (dateString: string) => {
  return dateString ? new Date(dateString) : dateString;
};
