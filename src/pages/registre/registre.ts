import { Component } from '@angular/core';
import {NavController, Events, ToastController} from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {TabsPage} from "../tabs/tabs";
import { Storage } from '@ionic/storage';
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-registre',
  templateUrl: 'registre.html'
})
export class RegistrePage {
  sampleForm: FormGroup;
  submitAttempt:any;
  user:any;
  pass1:any;
  pass2:any;


  constructor(public navCtrl: NavController,public events: Events,private formBuilder:FormBuilder,public http: Http,private storage: Storage,public toastCtrl: ToastController) {
    this.user=null;
    this.pass1=null;
    this.sampleForm = formBuilder.group({
      email: ['',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])]
    });

  }
  save(){

    this.submitAttempt = true;
    if (this.pass1!=this.pass2){
      let toast = this.toastCtrl.create({
        message: 'Les contrasenyes no coincideixen',
        duration: 3000
      });
      toast.present();
    }
    else if(!this.sampleForm.controls.email.valid || !this.sampleForm.controls.password.valid ){
      console.log("error");
    }
    else {
      this.submitAttempt = false;
      console.log("success!");
      let data={mail:this.user,password:this.pass1};
      this.http.post("http://54.77.194.175/register", data).map(res => res.json()).subscribe(
        result => {
          console.log(result);
          if(this.user===result[0].mail){
            this.navCtrl.setRoot(LoginPage);
          }
          else {
            let toast = this.toastCtrl.create({
              message: 'El mail ja existeix',
              duration: 3000
            });
            toast.present();
          }
        },
        error=>{
          let toast = this.toastCtrl.create({
            message: 'El mail ja està registrat',
            duration: 3000
          });
          toast.present();
        }
      );
    }



  }


}
