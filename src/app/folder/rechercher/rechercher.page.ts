import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rechercher',
  templateUrl: './rechercher.page.html',
  styleUrls: ['./rechercher.page.scss'],
})
export class RechercherPage implements OnInit {

  public imm:string;
  private dataCar: Object;
  public err:string;

  segmentModel = "visite";

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
  }

  onLoadCar(){
    this.httpClient.get("http://192.168.88.254:2053/index.php/controles_techniques/one_visite/?IMM="+this.imm+"")
    // this.httpClient.get("http://154.126.79.185:2053/index.php/controles_techniques/one_visite/?IMM="+this.imm+"")
      .subscribe(data=>{
        this.dataCar=data[0];
        // console.log(data);
      }, err=>{
        console.log(err);
        // this.err="Véhicule et renseignements visite introuvables.";
      })
  }

  segmentChanged(event){
    console.log(this.segmentModel);
    
    console.log(event);
  }

  onClearCar(){
    this.imm = "";
    this.err = "";
  }

}
