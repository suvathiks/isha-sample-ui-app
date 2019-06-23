import { Component, OnInit, HostListener } from "@angular/core";
import { Observable } from "rxjs";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Store, Select } from "@ngxs/store";
import { ComponentCanDeactivate } from "./can-deactivate.guard";
import {
  ProgramState,
  ProgramStateModel,
  defaultProgramState,
  formIdProgram
} from "./../../../../state/programs/program.state";
import { Program } from "./../../../../models/program.model";
import { ConstantParsingService } from "./../../../../services/constant-parsing.service";
import { ConstantState } from "./../../../../state/constants/constants.state";
import {
  programType,
  country
} from "./../../../../shared/constants/constantTypeCodes";
import { Constant } from "./../../../../models/constant.model";
import { ProgramFormCreator } from "./program.form";
import {FormCloseChecker} from './../../../../sdk/features/master-form/services/form-close-checker.service';


export const formRouteProgram = "/programs/add-edit";
export const formCloseNavigationRouteProgram = "/programs";

@Component({
  selector: "app-add-program",
  templateUrl: "./add-program.component.html",
  styleUrls: ["./add-program.component.scss"]
})
export class AddEditProgramComponent implements OnInit {
  formId: string = formIdProgram;
  formCloseNavigationRoute: string = formCloseNavigationRouteProgram;
  programForm: FormGroup = this.programFormCreator.generateProgramForm(
    new Program()
  );
  submittingForm: boolean = false;
  formSubmitted: boolean = false;
  showNotification: string;
  notificationMessage: string;
  @Select(ProgramState.state) programState$: Observable<ProgramStateModel>;
  programState: ProgramStateModel = new ProgramStateModel();
  @Select(ConstantState.constantValues)
  constantValues$: Observable<Constant[]>;
  constantValues: Constant[] = [];
  editingProgramForm: Program;
  recordId: number | "NEW";
  programOptions;
  countryOptions;
  fieldParams = {};

  prepareDropdownOptions(list) {
    let options = [
      {
        label: "Select",
        value: ""
      }
    ];
    list.map(item => {
      options = [
        ...options,
        {
          label: item.text,
          value: item.key
        }
      ];
    });
    return options;
  }

  /**
   * Checks whether form can be closed safely
   */
  formCanClose(): boolean {
    return this.formCloseChecker.formCanClose(this.programForm, this.formSubmitted);
  }

  ngOnInit(): void {}

  constructor(
    public router: Router,
    private messageService: MessageService,
    private store: Store,
    private constantService: ConstantParsingService,
    private programFormCreator: ProgramFormCreator,
    private formCloseChecker: FormCloseChecker,
  ) {
    this.programState$.subscribe(latestState => {
      this.editingProgramForm = latestState.programForm.model;
      this.submittingForm = latestState.submittingForm;
      this.formSubmitted = latestState.formSubmitted;
      this.recordId = this.editingProgramForm.programId;
      this.showNotification = latestState.showNotification;
      this.notificationMessage = latestState.notificationMessage;
      this.programState = latestState;
    });
    this.programForm = this.programFormCreator.generateProgramForm(
      this.editingProgramForm
    );

    this.constantValues$.subscribe(value => {
      this.constantValues = value;
      let programOptions = this.constantService.getConstantValues(
        this.constantValues,
        programType
      );
      let countries = this.constantService.getConstantValues(
        this.constantValues,
        country
      );
      this.countryOptions = this.prepareDropdownOptions(countries);
      this.programOptions = this.prepareDropdownOptions(programOptions);
    });
  }

  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener("window:beforeunload")
  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    return this.formCanClose();
  }
}
