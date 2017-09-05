import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-contact',
  templateUrl: 'noticies.html'
})
export class NoticiesPage {
  noticies:any;

  constructor(public navCtrl: NavController,public http: Http) {
    this.http.get('http://54.77.194.175/news').map(res => res.json()).subscribe(result=>{this.noticies=result;});
  }

}
