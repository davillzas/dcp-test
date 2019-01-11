import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { LoadingController,AlertController } from 'ionic-angular';
/**
 * Generated class for the UserTotalDiscountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-total-discount',
  templateUrl: 'user-total-discount.html',
})
export class UserTotalDiscountPage {
  user_discount_code : any;
  value_user_discount : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiServe : ApiProvider,public loadingCtrl: LoadingController, public alertCtrl: AlertController, public App : App) {
    this.get_data_user_discount()
  }

  get_data_user_discount(){
    this.user_discount_code = this.navParams.get('user_discount_code');

    this.apiServe.load_total_discount(this.user_discount_code)
      .then((data) => {
         this.value_user_discount = data;
         
    })
  }

  cancle_user_discount(){
    let confirm = this.alertCtrl.create({
      title: 'คุณแน่ใจหรือไม่ที่จะยกเลิกรายการนี้?',
      message: 'รายการนี้จะถูกบันทึกลงในระบบ คุณแน่ใจหรือไม่ที่จะยกเลิกรายการนี้',
      buttons: [
        {
          text: 'ยืนยัน',
          handler: () => {
            this.api_cancle_user(this.user_discount_code)
          }
        },
        {
          text: 'ยกเลิก',
          handler: () => {
            
          }
        }
      ]
    });
    confirm.present();
  }

  api_cancle_user(user_discount_code){
    this.apiServe.cancle_user_discount(user_discount_code)
    .then((data) => {
       let value_edit =  JSON.stringify(data);
       if(value_edit['act'] == 1){
         let alert = this.alertCtrl.create({
           title: 'ไม่สามารถบันทึกข้อมูลได้!',
           subTitle: 'กรุณาติดต่อเจ้าหน้าที่',
           buttons: ['OK']
         });
         alert.present();
       }else{
         let alert = this.alertCtrl.create({
           title: 'ทำรายการสำเร็จ',
           subTitle: 'ระบบได้ยกเลิกข้อมูลของท่านเรียบร้อยแล้ว',
           buttons: [
             {
               text: 'ยืนยัน',
               handler: () => {
                 setTimeout(() => {
                  this.navCtrl.pop();
                 }, 500);
               }
             }]
         });
         alert.present();

       }
    })
  }

}
