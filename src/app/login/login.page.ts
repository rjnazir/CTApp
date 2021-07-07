import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// import { app, auth } from 'firebase/app';
import app from 'firebase/app';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit, OnDestroy, AfterViewInit {
  backButtonSubscription; 
  username: string = "";
  password: string = "";
  alertShown: boolean = true;

  constructor(
    public afAuth: AngularFireAuth,
    public toastController: ToastController,
    public platform: Platform,
    private router: Router,
    private alertCtrl : AlertController,
  ) {
    this.platform.platforms();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
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

  presentConfirm() {
    this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Voullez-vous quiiter l\'application?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.alertShown=false;
          }
        },
        {
          text: 'Oui',
          handler: () => {
            console.log("navigator['app'].exitApp()");
            navigator['app'].exitApp();
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  closeApp (){
    console.log("Quitter l'application");
    if (this.router.url === '/login') {
      console.log(this.router.url);
      this.presentConfirm();
    }
  }
}