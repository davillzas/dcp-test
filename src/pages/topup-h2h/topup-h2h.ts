import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { TopupH2hTypePage } from './../topup-h2h-type/topup-h2h-type';
/**
 * Generated class for the TopupH2hPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-topup-h2h',
  templateUrl: 'topup-h2h.html',
})
export class TopupH2hPage {
  icono_h2h : any;

  constructor(public app : App,public navCtrl: NavController, public navParams: NavParams , public apiServe : ApiProvider) {
    this.get_icon_topup_h2h();
  }

  get_icon_topup_h2h(){
    this.apiServe.get_icon_h2h()
    .subscribe((data) => {
      this.icono_h2h =  data;
      
      //this.load_category(this.city_id)
    })
  }

  toup_h2h_type(datatype = null){
    this.app.getRootNav().push(TopupH2hTypePage, { datatype : datatype});
  }
}
