import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  public information = {
    societe : "Direction générale de la sécurité routières",
    local   : "Rue Ravoninahitriarivo",
    address : "Alarobia Amboniloha - ANTANANARIVO 101",
    boitep  : "BP 784",
    web     : "dgsrmada.com",
    weblink : "http://dgsrmada.com",
    phone   : "+261 34 77 777 03",
    email   : "dgsr@gmail.com",
    facebook: "DGSR mada",
    facelink: "https://www.facebook.com/DGSRMada/?ref=aymt_homepage_panel&eid=ARCzQWCmshc_oO4BadFssWtS42rzErQ_cSGpr7uf2R2lcw653tPqR3d1TUOMQ_ovEfKmuuOPrRHN6s6u",
    logo    : "assets/logo.png"
  }

  constructor() { }

  ngOnInit() {
  }

}
