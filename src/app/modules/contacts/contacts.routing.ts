import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ContactsComponent } from "./components/contacts/contacts.component";
import { AddEditContactComponent } from "./components/add-contact/add-contact.component";
import { PendingChangesGuard } from './components/add-contact/can-deactivate.guard';

const routes: Routes = [
  {
    path: "",
    component: ContactsComponent
  },
  {
    path: "add-edit",
    component: AddEditContactComponent,
    canDeactivate: [PendingChangesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule {}
