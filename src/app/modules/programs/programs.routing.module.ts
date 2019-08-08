import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PendingChangesGuard} from '../programs/components/add-program/can-deactivate.guard';
import {ProgramsComponent} from './components/programs/programs.component';
import {AddProgramComponent} from './components/add-program/add-program.component';

const routes: Routes = [
  {
    path: "",
    component: ProgramsComponent
  },
  {
    path: "add-program",
    component: AddProgramComponent,
    canDeactivate: [PendingChangesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule {

}
