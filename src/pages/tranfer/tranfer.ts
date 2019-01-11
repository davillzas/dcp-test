import { TranferDetailPage } from './../tranfer-detail/tranfer-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController } from 'ionic-angular';
import { LoadingController,AlertController } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';

/**
 * Generated class for the TranferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tranfer',
  templateUrl: 'tranfer.html',
})
export class TranferPage {
  user_id : any
  data_tranfer : any;
  constructor(public navCtrl: NavController, public navParams: NavParams , public loaddingCtrl: LoadingController,
    public apiServe : ApiProvider ,public toastCtrl: ToastController
  ) {
    this.user_id = this.navParams.get('user_id');
    
    let loading = this.loaddingCtrl.create({
      content: 'กรุณารอสักครู่...'
    });
    
    loading.present();

    setTimeout(() => {
      this.get_data_tranfer();
      loading.dismiss();
    }, 1000);
  }

  get_data_tranfer(){
    this.apiServe.get_data_tranfer(this.user_id)
    .then((data) => {
        this.data_tranfer = data;
        var date_tranfer = this.data_tranfer[0]['transfer_user_datetime'];
        //console.log(JSON.stringify(this.data_tranfer));
        
    })

  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.get_data_tranfer()
      refresher.complete();
    }, 2000);
    
  }

  get_detail_tranfer(transfer_user_id){
    this.navCtrl.push(TranferDetailPage ,{transfer_user_id : transfer_user_id});
  }
}
