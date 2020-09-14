import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ToastController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import { BackButtonEvent } from '@ionic/core';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""

  constructor(
    public afAuth: AngularFireAuth,
    public toastController: ToastController,
    public platform: Platform,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async login (){
    const { username, password } = this
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(username, password)
      this.router.navigateByUrl('folder/home/home')
    } catch (err) {
      console.log(err)
      if(err.code === "auth/user-not-found"){
        console.log("Utilisateur introuvable.")
        this.errorMail()
      } else if (err.code === "auth/invalid-email") {
        console.log("Email invalide.")
        this.errorMail()
      } else {
        console.log("Erreur d'authentification.")
        this.errorMail()
      }
    }
  }

  async errorMail() {
    const toast = await this.toastController.create({
      message: 'Email ou/et mot de passe incorrect',
      duration: 3000,
      position: 'middle',
      color: 'danger',
      cssClass: 'text-center'
    });
    toast.present();
  }

  closeApp(){
    const routerEl = document.querySelector('ion-router');
    document.addEventListener('ionBackButton', (ev: BackButtonEvent) => {
      ev.detail.register(-1, () => {
        const path = window.location.pathname;
        if (path === routerEl.root) {
          App.exitApp();
        }
      });
    });
  }
}
