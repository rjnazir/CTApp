import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-rechercher',
  templateUrl: './rechercher.page.html',
  styleUrls: ['./rechercher.page.scss'],
})
export class RechercherPage implements OnInit {

  public imm:string;
  public dataCar: Object;
  public erreur:string;

  segmentModel = "visite";

  constructor(
    private httpClient:HttpClient,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  onLoadCar(){
      this.httpClient.get("http://192.168.88.254:2053/index.php/controles_techniques/one_visite/?IMM="+this.imm+"")
                      .subscribe(data=>{
                        this.dataCar=data[0];
                        console.log(data[0]);
                      },
                      erreur=>{
                        console.log(erreur);
                        if(erreur){
                          this.messageVhlNotExisting();
                        }
                      })
  }

  segmentChanged(event){
    console.log(this.segmentModel);
    
    console.log(event);
  }

  onClearCar(){
    this.imm = "";
    this.erreur = "";
  }

  async messageVhlNotExisting() {
    const toast = await this.toastController.create({
      message: 'Véhicule et renseignements visite introuvables.',
      duration: 2000,
      position: 'middle',
      color: 'danger',
      cssClass: 'text-center'
    });
    toast.present();
  }

}