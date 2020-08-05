import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public societe = {
    name : "Direction générale de la sécurité routière",
    logo : "assets/logo.png"
  }

  constructor() { }

  ngOnInit() {
  }

}
