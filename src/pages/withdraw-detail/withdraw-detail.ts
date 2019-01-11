import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController } from 'ionic-angular';
import { LoadingController,AlertController } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';

/**
 * Generated class for the WithdrawDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-withdraw-detail',
  templateUrl: 'withdraw-detail.html',
})
export class WithdrawDetailPage {
  user_id : any;
  data_withdraw_1 : any;
  data_withdraw_2 : any;
  constructor(public navCtrl: NavController, public navParams: NavParams , public loaddingCtrl: LoadingController,
    public apiServe : ApiProvider ,public toastCtrl: ToastController) {
      this.user_id = this.navParams.get('user_id');

      let loading = this.loaddingCtrl.create({
        content: 'กรุณารอสักครู่...'
      });
      
      loading.present();
  
      setTimeout(() => {
        this.get_data_withdraw_detail();
        loading.dismiss();
      }, 1000);
  }

  get_data_withdraw_detail(){
    
    this.apiServe.withdraw_detail_status_1(this.user_id)
    .then((data) => {
       
        if(data != null){
          this.data_withdraw_1 = data;
        }else{
          this.data_withdraw_1 = "";
        }
    })

    this.apiServe.withdraw_detail_status_2(this.user_id)
    .then((data) => {
      if(data != null){
        this.data_withdraw_2 = data;
      }else{
        this.data_withdraw_2 = "";
      }
      
    })
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.get_data_withdraw_detail()
      refresher.complete();
    }, 2000);
    
  }

  

}
