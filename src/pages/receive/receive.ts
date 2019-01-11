import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController } from 'ionic-angular';
import { LoadingController,AlertController } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';

/**
 * Generated class for the ReceivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receive',
  templateUrl: 'receive.html',
})
export class ReceivePage {
  user_id : any
  data_receive : any;

  constructor(public navCtrl: NavController, public navParams: NavParams , public loaddingCtrl: LoadingController,
    public apiServe : ApiProvider ,public toastCtrl: ToastController) {
      this.user_id = this.navParams.get('user_id');

      let loading = this.loaddingCtrl.create({
        content: 'กรุณารอสักครู่...'
      });
      
      loading.present();
  
      setTimeout(() => {
        this.get_data_receive();
        loading.dismiss();
      }, 1000);
  }

  get_data_receive(){
    this.apiServe.get_data_receive(this.user_id)
    .then((data) => {
      this.data_receive = data;
    })
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.get_data_receive()
      refresher.complete();
    }, 2000);
    
  }
 

}
