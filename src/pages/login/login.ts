import { Component } from '@angular/core';
import {NavController, Events, ToastController, AlertController, ModalController} from 'ionic-angular';
import {trigger, state, style, transition, animate, keyframes } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {HomePage} from "../home/home";
import { Storage } from '@ionic/storage';
import {TabsPage} from "../tabs/tabs";
import {RegistrePage} from "../registre/registre";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [

    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),

    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})

export class LoginPage {
  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  pass:any;
  mail:any;
  constructor(private storage: Storage,public navCtrl: NavController,public events: Events,public http: Http,public toastCtrl: ToastController,public modalCtrl: ModalController) {
    this.storage.get("logged").then((log) => {
      if(log===true){
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }
login(){
if(typeof this.pass==="undefined" || typeof this.mail==="undefined"){
  alert("Introdueix mail i contraseña")
}
else{
  let data={mail:this.mail,password:this.pass};
  this.http.post("http://54.77.194.175/login", data).map(res => res.json()).subscribe(
    result => {
      console.log(result);
      if (result[0].mail === data.mail) {
        this.storage.set("logged",true);
        this.navCtrl.setRoot(TabsPage);
      }
      else {
        let toast = this.toastCtrl.create({
          message: 'Mail o contrasenya erronis',
          duration: 3000
        });
        toast.present();
      }

    },
    error=>{
      let toast = this.toastCtrl.create({
        message: 'Mail o contrasenya erronis',
        duration: 3000
      });
      toast.present();
    }
      );
}
}
register(){

    let modal = this.modalCtrl.create(RegistrePage);
    modal.present();

}
}
