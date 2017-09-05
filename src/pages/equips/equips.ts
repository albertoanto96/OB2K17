import { Component } from '@angular/core';
import {ModalController, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ModalContentPage} from "../modal-equip/modal-equip";

@Component({
  selector: 'page-contact',
  templateUrl: 'equips.html'
})
export class EquipsPage {
equips:any;
equipsf:any;
equipssave:any;
cat:any;
constructor(public navCtrl: NavController,public http: Http,public modalCtrl: ModalController) {
  this.equipssave=[];
    this.http.get('http://54.77.194.175/teams').map(res => res.json()).subscribe(result=>{this.equips=result;this.equipssave=result;});
  }
  cambio(){
  this.equipsf=[];
  for(let i=0;i<this.equipssave.length.toString();i++){
    if(this.equipssave[i].category===this.cat){
      this.equipsf.push(this.equipssave[i]);
    }
  }
  this.equips=this.equipsf;
  }
  detail(equip){
    this.navCtrl.push(ModalContentPage,{equip:equip});
  }

}

