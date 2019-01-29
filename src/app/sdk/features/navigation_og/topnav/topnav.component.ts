import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import {Logout} from './../../keycloak/keycloak.actions';

@Component({
  selector: "app-topnav",
  templateUrl: "./topnav.component.html",
  styleUrls: ["./topnav.component.scss"]
})
export class TopnavComponent implements OnInit {
  @Input()
  currentPath;
  logout() {
    this.store.dispatch(new Logout());
  }
  constructor(private store: Store) {}
  ngOnInit() {}
}
