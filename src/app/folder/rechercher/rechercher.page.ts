import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-rechercher',
  templateUrl: './rechercher.page.html',
  styleUrls: ['./rechercher.page.scss'],
})
export class RechercherPage implements OnInit {

  public imm: string;
  public data : object = [];
  public erreur: string;

  segmentModel = "visite";

  constructor(
    private httpClient:HttpClient,
    private toastController: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  onLoadCar(){
    if(this.imm != null){
      this.httpClient.get("http://154.126.60.58:2053/index.php/controles_techniques/one_visite/?IMM="+this.imm+"")
        .subscribe(
          data =>{
            this.presentLoading();
            this.data = data;
            console.log(data);
            if(data === null) this.AlertVhlNotExisting()
          },
          erreur => {
            console.log(erreur)
          }
        )
    }else{
      this.AlertImmVide()
    }
  }

  segmentChanged(event){
    console.log(this.segmentModel);
    
    console.log(event);
  }

  onClearCar(){
    this.imm = "";
    this.erreur = "";
    this.data = [];
  }

  async AlertVhlNotExisting() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Recherche infructueuse',
      message: '<center>Véhicule et renseignements visite introuvables.</center>',
      buttons: [
        {
          text:'OK',
          handler: () => {
            console.log('Confirmation véhicule introuvé.');
            this.imm = null;
          }
        }
      ],

    });

    await alert.present();
  }

  async AlertImmVide(){
    const alert =await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Immatriculation vide',
      message:'<center>Veuillez entrer une immatriculation svp!</center>',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Immatriculation vide.');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Veuillez patienter...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}