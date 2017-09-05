import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import {FiltreRondaPage} from "../filtre_ronda/filtre_ronda";

@Component({
  selector: 'page-about',
  templateUrl: 'rondes.html'
})
export class RondesPage {
sports:any;
colorG:any;
colorP:any;
finals:any;
semifinals:any;
cuarts:any;
vuitens:any;
repesca:any;
previa:any;
esport:any;
cat:any;
ronda:any;
  doRefresh(refresher) {
    this.storage.set('selectedRound',this.ronda);
    this.storage.get("selectedSport").then((spo) => {
      this.storage.get("selectedCat").then((c) => {
        if(c!=null) {
          this.events.publish('filtro', spo, c);
        }
      });
    });
    this.http.get('http://54.77.194.175/events').map(res => res.json()).subscribe(result=>{
      this.storage.set('events', result);
    });
    setTimeout(() => {
      this.storage.get("selectedRound").then((round) => {
        this.ronda=round;
      });
      refresher.complete();
    }, 2000);
  }

  constructor(public navCtrl: NavController,public http: Http,private storage: Storage,public events: Events) {
    this.storage.set("selectedSport","");
    this.storage.set("selectedCat","");
    this.colorG="danger";
    this.colorP="secondary";
    this.finals=[];
    this.semifinals=[];
    this.cuarts=[];
    this.vuitens=[];
    this.repesca=[];
    this.previa=[];
    this.ronda="previa";

    this.http.get('http://54.77.194.175/events').map(res => res.json()).subscribe(result=>{
      this.storage.set('events', result);
    });
    events.subscribe('filtro', (sport, cat) => {
      this.storage.set("selectedSport",sport);
      this.storage.set("selectedCat",cat);
      this.esport=sport.nom;
      this.cat=cat;
      this.finals=[];
      this.semifinals=[];
      this.cuarts=[];
      this.vuitens=[];
      this.repesca=[];
      this.previa=[];
      this.ronda="previa";
      let filtered=[];
      this.storage.get('events').then((events)=>{
        for(let i=0;i<events.length;i++){
          if(events[i].sport===sport.nom && events[i].category===cat){
            filtered.push(events[i]);
          }
        }
        for(let i=0;i<filtered.length;i++){
          if(filtered[i].round==="final"){
          this.finals.push(filtered[i])
          }
          if(filtered[i].round==="semifinal"){
            this.semifinals.push(filtered[i])
          }
          if(filtered[i].round==="cuarts"){
            this.cuarts.push(filtered[i])
          }
          if(filtered[i].round==="vuitens"){
            this.vuitens.push(filtered[i])
          }
          if(filtered[i].round==="repesca"){
            this.repesca.push(filtered[i])
          }
          if(filtered[i].round==="previa"){
            this.previa.push(filtered[i])
          }
        }
      })
    })
  }
  cambio(){this.navCtrl.push(FiltreRondaPage)}
}
