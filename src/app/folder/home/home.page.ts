import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

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

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router

  ) { }

  ngOnInit() {
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl('/login');
  }

}
