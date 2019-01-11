
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { TopupMobilePage } from './../topup-mobile/topup-mobile';

/**
 * Generated class for the TopupH2hTypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-topup-h2h-type',
  templateUrl: 'topup-h2h-type.html',
})
export class TopupH2hTypePage {
  h2h_type : any;
  data_h2h : any;

  constructor(public navCtrl: NavController, public navParams: NavParams , public Api : ApiProvider , public app : App) {
    this.h2h_type = this.navParams.get('datatype');
    this.Api.get_h2h_topup(this.h2h_type)
        .then((data) => {
          //alert(JSON.stringify(data))
          this.data_h2h = data;
        })

  }

  topup_mobile(data){
    this.app.getRootNav().push(TopupMobilePage, { data_h2h : data});
  }


}
