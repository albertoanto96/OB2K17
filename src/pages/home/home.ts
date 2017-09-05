import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {NoticiesPage} from "../noticies/noticies";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {CallNumber} from "@ionic-native/call-number";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ResArray:any;
  ResArrayM:any;
  ResArrayF:any;
  AM:boolean;
  FM:boolean;
  doRefresh(refresher) {
    this.http.get('http://54.77.194.175/teams').map(res => res.json()).subscribe(result=>{
      this.ResArrayM=[];
      this.ResArrayF=[];
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
      this.AM=true;
      this.ResArrayF.sort(function(a, b) {
        return (b.points) - (a.points);
      });
      for (let i=0; i<this.ResArrayF.length;i++){
        this.ResArrayF[i].pos=i+1;
      }
      this.FM=true;
    });
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  constructor(public http: Http,public navCtrl: NavController,public alertCtrl: AlertController,private callNumber: CallNumber) {
    this.AM=false;
    this.FM=false;
  this.ResArray=[];
  this.ResArrayM=[];
  this.ResArrayF=[];
    this.http.get('http://54.77.194.175/teams').map(res => res.json()).subscribe(result=>{
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
      this.AM=true;
      this.ResArrayF.sort(function(a, b) {
        return (b.points) - (a.points);
      });
      for (let i=0; i<this.ResArrayF.length;i++){
        this.ResArrayF[i].pos=i+1;
      }
      this.FM=true;
    });
  }
  noticPage(){
    this.navCtrl.push(NoticiesPage);
  }
  info(){
    let alert = this.alertCtrl.create({
      title: 'Contactes',
      cssClass:'alertcss',
      buttons: [
        {
          text: 'Bruno - 661986752',
          handler: () => {
            this.callNumber.callNumber("661986752", true)
              .then(() => console.log('Launched dialer!'))
              .catch(() => console.log('Error launching dialer'));
          }
        },
        {
          text: 'Jose - 636917137',
          handler: () => {
            this.callNumber.callNumber("636917137", true)
              .then(() => console.log('Launched dialer!'))
              .catch(() => console.log('Error launching dialer'));
          }
        }
        ,
        {
          text: 'Laia - 689493473',
          handler: () => {
            this.callNumber.callNumber("689493473", true)
              .then(() => console.log('Launched dialer!'))
              .catch(() => console.log('Error launching dialer'));
          }
        },
        {
          text: 'Pablo - 671306558',
          handler: () => {
            this.callNumber.callNumber("671306558", true)
              .then(() => console.log('Launched dialer!'))
              .catch(() => console.log('Error launching dialer'));
          }
        }
      ]
    });
    alert.present();
  }
}


