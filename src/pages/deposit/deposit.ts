import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController } from 'ionic-angular';
import { LoadingController,AlertController } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
/**
 * Generated class for the DepositPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deposit',
  templateUrl: 'deposit.html',
})
export class DepositPage {
  phone : any;
  deposit_status_1 : any;
  deposit_status_2 : any;

  constructor(public navCtrl: NavController, public navParams: NavParams , public loaddingCtrl: LoadingController,
    public apiServe : ApiProvider ,public toastCtrl: ToastController
  ) {
    this.phone = this.navParams.get('phone');
    
    let loading = this.loaddingCtrl.create({
      content: 'กรุณารอสักครู่...'
    });
    
    loading.present();

    setTimeout(() => {
      this.get_data_deposit();
      loading.dismiss();
    }, 1000);
   
  }

  get_data_deposit(){
    
    this.apiServe.deposit_status_1(this.phone)
    .then((data) => {
      if(data != null){
        this.deposit_status_1 = data;
      }else{
        this.deposit_status_1 = "";
      }
        
    })

    this.apiServe.deposit_status_2(this.phone)
    .then((data) => {
      if(data != null){
        this.deposit_status_2 = data;
      }else{
        this.deposit_status_2 = "";
      }
      
    })
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.get_data_deposit()
      refresher.complete();
    }, 2000);
    
  }
}
