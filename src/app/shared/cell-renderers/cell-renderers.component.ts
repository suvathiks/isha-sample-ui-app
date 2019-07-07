import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

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
  private recordId: number | "NEW" = "NEW";
  agInit(params: any): void {
    this.params = params;
    this.recordId = this.params.data.id;
  }

  public onEdit(): void {
    this.params.onEdit(this.recordId);
  }
  constructor() {}
}
