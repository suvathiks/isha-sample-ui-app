import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProgramsComponent } from "./components/programs/programs.component";
import { AddEditProgramComponent } from "./components/add-program/add-program.component";
import { PendingChangesGuard } from './components/add-program/can-deactivate.guard';

const routes: Routes = [
  {
    path: "",
    component: ProgramsComponent
  },
  {
    path: "add-edit",
    component: AddEditProgramComponent,
    canDeactivate: [PendingChangesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule {}
