import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-contact',
  templateUrl: 'meuequip.html'
})
export class MeuEquipPage {
equips:any;
equip:any;
events:any;
pos:any;
profile:any;
date:any;
team:any;
  ResArray:any;
  ResArrayM:any;
  ResArrayF:any;
  constructor(public navCtrl: NavController,public http: Http,private storage: Storage) {

    this.events=[];
    this.ResArray=[];
    this.ResArrayM=[];
    this.ResArrayF=[];
    this.profile=false;
    this.http.get('http://54.77.194.175/teams').map(res => res.json()).subscribe(result=>{
      this.equips=result;
      this.ResArray=result;
      for (let i=0; i<this.ResArray.length;i++){
        if(this.ResArray[i].category==="Masculí"){
          this.ResArrayM.push(this.ResArray[i])
        }
        if(this.ResArray[i].category==="Femení"){
          this.ResArrayF.push(this.ResArray[i])
        }
      }
      this.ResArrayM.sort(function(a, b) {
        return (b.points) - (a.points);
      });

      for (let i=0; i<this.ResArrayM.length;i++){
        this.ResArrayM[i].pos=i+1;
      }
      this.ResArrayF.sort(function(a, b) {
        return (b.points) - (a.points);
      });
      for (let i=0; i<this.ResArrayF.length;i++){
        this.ResArrayF[i].pos=i+1;
      }
      this.storage.get("myteam").then((log) => {
        if(log){
          this.equip=log.name;
          for (let i=0;i<this.ResArray.length;i++)
          {
            if(this.ResArray[i].name===log.name){
              this.selectEquip(this.ResArray[i]);
            }
          }
        }
      });
    });
  }
selectEquip(equip){
    this.storage.set("myteam",equip);
    let data={equip:equip.name};
    this.team=equip;
    let cat=equip.category;
    if(cat==='Masculí'){
      for(let i=0;i<this.ResArrayM.length;i++){
        if(this.ResArrayM[i].name===data.equip){
          this.pos=this.ResArrayM[i].pos;
        }
      }
    }
  if(cat==='Femení'){
    for(let i=0;i<this.ResArrayF.length;i++){
      if(data.equip===this.ResArrayF[i].name){
        this.pos=this.ResArrayF[i].pos;
      }
    }

  }
    let actual=new Date();
    let actualf=new Date(actual.getFullYear(),actual.getMonth(),actual.getUTCDate());
  this.http.post('http://54.77.194.175/teamevents',data).map(res => res.json()).subscribe(result=>{
    let filter=[];
    for(let i=0; i<result.length;i++){
      let d=result[i].date.split("/");
      let date=new Date(d[2],d[1]-1,d[0]);
      if(date>=actualf){
        filter.push(result[i])
      }
    }
    filter.sort(function(a,b){
      let a1=a.date.split("/");
      let c = new Date(a1[2],a1[1]-1,a1[0]);
      let b1=b.date.split("/");
      let d = new Date(b1[2],b1[1]-1,b1[0]);
      return c.getTime()-d.getTime();
    });
    this.events=filter;
    this.profile=true

  });
}
}
