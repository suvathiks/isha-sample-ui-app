import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { Store } from "@ngxs/store";
import { SetForm } from "./../../../../sdk/features/master-form/master-form.actions";
import { formIdProgram } from "./../../../../state/programs/program.state";
import { Router } from "@angular/router";
import { formRouteProgram } from "./../add-program/add-program.component";

@Component({
  selector: "edit-button",
  template: `
    <button mat-icon-button (click)="onEdit()">
      <i class="material-icons">edit</i>
    </button>
  `
})
export class EditButtonRenderer {
  private params: any;
  private formId: string = formIdProgram;
  private formRoute: string = formRouteProgram;
  private recordId: number | "NEW" = "NEW";
  agInit(params: any): void {
    this.params = params;
    this.recordId = this.params.data.programId;
  }

  public onEdit(): void {
    this.store.dispatch(new SetForm(this.formId, this.recordId));
    this.router.navigateByUrl(this.formRoute);
  }
  constructor(private store: Store, private router: Router) {}
}
