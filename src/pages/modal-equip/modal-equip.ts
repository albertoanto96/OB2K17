import { Component } from '@angular/core';
import {NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-contact',
  templateUrl: 'modal-equip.html'
})
export class ModalContentPage {
  equip: any;

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController,private callNumber: CallNumber) {
    this.equip = params.get("equip");

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  call(number){
    this.callNumber.callNumber(number, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }
}
