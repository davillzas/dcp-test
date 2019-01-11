import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';

/**
 * Generated class for the TranferDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tranfer-detail',
  templateUrl: 'tranfer-detail.html',
})
export class TranferDetailPage {

  tranfer_id : any;
  tranfer_detail : any;
  constructor(public navCtrl: NavController, public navParams: NavParams , public api : ApiProvider) {
      this.tranfer_id = this.navParams.get('transfer_user_id');
      
      this.get_tranfer_detail(this.tranfer_id)
  }

  get_tranfer_detail(tranfer_id){
    this.api.get_tranfer_detail(tranfer_id).then((data) => {
      //var t = new Date();
      this.tranfer_detail = data;
    })
  }

}
