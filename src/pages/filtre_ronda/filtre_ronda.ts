import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';


@Component({
  selector: 'page-contact',
  templateUrl: 'filtre_ronda.html'
})
export class FiltreRondaPage {
  sports:any;
  cat:any;
  selected:any;
  constructor(public navCtrl: NavController,public events: Events) {
    this.sports=[{
      nom:"Futbol-7"
    },
      {
        nom:"Futbol-Sala"
      },
      {
        nom:"Waterpolo"
      },
      {
        nom:"Bàsquet"
      },
      {
        nom:"Tenis"
      },
      {
        nom:"Handbol"
      },
      {
        nom:"Volei-Pista"
      },
      {
        nom:"Pàdel"
      },
      {
        nom:"Frontó"
      }
    ];
  }
  selectSport(sport){
    this.selected=sport;
  }
  filtre(){
    if(typeof this.cat==="undefined"||typeof this.selected==="undefined"){alert("Selecciona esport i categoría")}
    else{this.events.publish('filtro', this.selected, this.cat);
      this.navCtrl.pop();}

  }

}
