import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-contact',
  templateUrl: 'calendari.html'
})
export class CalendariPage {
  myDate: string = new Date().toISOString();
  esports:any;
  sport:string="a";
  events:any;
  filtered:any;
  actualdate:any;
  doRefresh(refresher) {
    this.http.get('http://54.77.194.175/events').map(res => res.json()).subscribe(result=>{
      this.storage.set('save', result);
      this.datef();
    });
    this.sport="a";
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  constructor(public navCtrl: NavController,public http: Http,private storage: Storage) {
    this.esports=[{
      nom:"Futbol-7"
    },
      {
        nom:"Futbol-Sala"
      },
      {
        nom:"Waterpolo"
      },
      {
        nom:"Petanca"
      },
      {
        nom:"Bàsquet"
      },
      {
        nom:"Ping-Pong"
      },
      {
        nom:"Tenis"
      },
      {
        nom:"Marató"
      },
      {
        nom:"Dards"
      },
      {
        nom:"Natació"
      },
      {
        nom:"Minigolf"
      },
      {
        nom:"Dominó"
      },
      {
        nom:"Billar"
      },
      {
        nom:"Futbolí"
      },
      {
        nom:"Handbol"
      },
      {
        nom:"Ciclisme"
      },
      {
        nom:"Volei-Pista"
      },
      {
        nom:"Volei-Platja"
      },
      {
        nom:"Pàdel"
      },
      {
        nom:"Frontó"
      },
      {
        nom:"Escacs"
      }
    ];
    this.http.get('http://54.77.194.175/events').map(res => res.json()).subscribe(result=>{
      this.storage.set('save', result);
      this.datef();
    });
  }
  datefilter(){
    let newd=new Date(this.myDate);
    let month=newd.getMonth()+1;
    let selecteddate=newd.getDate().toString()+"/"+month.toString()+"/"+newd.getFullYear().toString();
    let x = 0;
    this.filtered = [];
    this.storage.get('save').then((save) => {
      if (this.sport==="a"){
        for (let i = 0; i < save.length.toString(); i++) {
          if (save[i].date === selecteddate) {
            this.filtered[x] = save[i];
            x++;
          }
        }
        this.events = this.filtered;
      }
      else{
        for (let i = 0; i < save.length.toString(); i++) {
          if (save[i].date === selecteddate && save[i].sport===this.sport) {
            this.filtered[x] = save[i];
            x++;
          }
        }
        this.events = this.filtered;
      }
    });
  }
  datef(){
    let newd=new Date(this.myDate);
    let month=newd.getMonth()+1;
    let selecteddate=newd.getDate().toString()+"/"+month.toString()+"/"+newd.getFullYear().toString();
    let x = 0;
    this.filtered = [];
    this.storage.get('save').then((save) => {
      console.log(save);
      for (let i = 0; i < save.length.toString(); i++) {
        if (save[i].date === selecteddate) {
          this.filtered[x] = save[i];
          x++;
        }
      }

      this.events = this.filtered;
    });

  }
  filtro(esport) {
    let newd=new Date(this.myDate);
    let month=newd.getMonth()+1;
    let selecteddate=newd.getDate().toString()+"/"+month.toString()+"/"+newd.getFullYear().toString();
    let x = 0;
    this.filtered = [];
    this.storage.get('save').then((save) => {
      if (esport === "all") {
        for (let i = 0; i < save.length.toString(); i++) {
          if (save[i].date === selecteddate) {
            this.filtered[x] = save[i];
            x++;
          }
        }
        this.events = this.filtered;
      }
      else {
        for (let i = 0; i < save.length.toString(); i++) {
          if (save[i].sport === esport.nom && save[i].date === selecteddate) {
            this.filtered[x] = save[i];
            x++;
          }
        }
        this.events = this.filtered;
      }
    });

  }


}
