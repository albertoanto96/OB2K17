import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler, Modal} from 'ionic-angular';
import { MyApp } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { RondesPage } from '../pages/rondes/rondes';
import { CalendariPage } from '../pages/calendari/calendari';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {EquipsPage} from '../pages/equips/equips';
import { MeuEquipPage } from '../pages/meuequip/meuequip';
import { NoticiesPage } from '../pages/noticies/noticies';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HttpModule} from '@angular/http';
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import { Vibration } from '@ionic-native/vibration';
import {ModalContentPage} from "../pages/modal-equip/modal-equip";
import {IonicStorageModule} from "@ionic/storage";
import {FiltreRondaPage} from "../pages/filtre_ronda/filtre_ronda";
import {LoginPage} from "../pages/login/login";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RegistrePage} from "../pages/registre/registre";
import {CallNumber} from "@ionic-native/call-number";

@NgModule({
  declarations: [
    MyApp,
    RondesPage,
    CalendariPage,
    HomePage,
    TabsPage,
    EquipsPage,
    MeuEquipPage,
    NoticiesPage,
    ModalContentPage,
    FiltreRondaPage,
    LoginPage,
    RegistrePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RondesPage,
    CalendariPage,
    HomePage,
    TabsPage,
    EquipsPage,
    MeuEquipPage,
    NoticiesPage,
    ModalContentPage,
    FiltreRondaPage,
    LoginPage,
    RegistrePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Push,
    Vibration,
    CallNumber
  ]
})
export class AppModule {}
