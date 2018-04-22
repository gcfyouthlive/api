import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mainItems = [
    {routerLink: "/dashboard", iconClass: "", name: "Dashboard"},
    {routerLink: "/people", iconClass: "", name: "People"},
    {routerLink: "/reports", iconClass: "", name: "Reports"}
  ]

  constructor() { }

  ngOnInit() {
  }

}
