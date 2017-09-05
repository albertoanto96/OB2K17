import { Component } from '@angular/core';
import {AlertController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Vibration } from '@ionic-native/vibration';
import {LoginPage} from "../pages/login/login";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private alertCtrl: AlertController,public push: Push,private vibration: Vibration) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.pushsetup();

    });

  }
  pushsetup() {
    const options: PushOptions = {
      android: {
        senderID: '13996629048',
        vibrate:'true',
        sound:'true',
        forceShow:'true'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        let youralert = this.alertCtrl.create({
          title: 'New Push notification',
          message: notification.message
        });
        this.vibration.vibrate(1000);
        youralert.present();
      }
    });

    pushObject.on('registration').subscribe((registration: any) => {
      //do whatever you want with the registration ID
    });

    pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }

}
