import { Component } from '@angular/core';

import { RondesPage } from '../rondes/rondes';
import { CalendariPage } from '../calendari/calendari';
import { HomePage } from '../home/home';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {EquipsPage} from "../equips/equips";
import {MeuEquipPage} from "../meuequip/meuequip";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab3Root = HomePage;
  tab1Root = CalendariPage;
  tab2Root = RondesPage;
  tab4Root= EquipsPage;
  tab5Root=MeuEquipPage;


  constructor(public http: Http) {


  }
}
