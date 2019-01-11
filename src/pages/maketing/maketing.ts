import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController } from 'ionic-angular';
import { LoadingController,AlertController } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';

/**
 * Generated class for the MaketingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maketing',
  templateUrl: 'maketing.html',
})
export class MaketingPage {
  user_id : any;
  data_maketing : any;

  constructor(public navCtrl: NavController, public navParams: NavParams , public loaddingCtrl: LoadingController,
    public apiServe : ApiProvider ,public toastCtrl: ToastController) {
      this.user_id = this.navParams.get('user_id');

      let loading = this.loaddingCtrl.create({
        content: 'กรุณารอสักครู่...'
      });
      
      loading.present();
  
      setTimeout(() => {
        this.get_data_maketing();
        loading.dismiss();
      }, 1000);
  }

  get_data_maketing(){
    this.apiServe.get_data_maketing(this.user_id)
    .then((data) => {
       
        if(data != null){
          this.data_maketing = data;
        }else{
          this.data_maketing = "";
        }
    })
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.get_data_maketing()
      refresher.complete();
    }, 2000);
    
  }
  

  

  

}
