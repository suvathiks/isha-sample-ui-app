import {Injectable} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  required,
  maxLength9,
  dateRangeValidator
} from "./validators";

@Injectable({
  providedIn: "root"
})
export class ProgramFormCreator {
  constructor(private fb: FormBuilder) {}
  generateProgramForm = program => {
    const programForm = this.fb.group({
      active: [1],
      programId: [program.programId],
      programName: [program.programName],
    //   programName: [program.programName, [Validators.required]],
      programType: [program.programType, Validators.required],
      startDate: [
        parseDateForCalendar(program.startDate),
        [Validators.required, dateRangeValidator]
      ],
      endDate: [
        parseDateForCalendar(program.endDate),
        [Validators.required, dateRangeValidator]
      ],
      venue: [program.venue],
      city: [program.city, Validators.required],
      state: [program.state, Validators.required],
      country: [program.country, Validators.required]
    });
    return programForm;
  };
}

const parseDateForCalendar = (dateString: string) => {
  return dateString ? new Date(dateString) : dateString;
};
