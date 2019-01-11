import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';

/**
 * Generated class for the UserCheckPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-check-payment',
  templateUrl: 'user-check-payment.html',
})
export class UserCheckPaymentPage {
  user_id : any;
  user_activate : any;
  data_payment : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiServe : ApiProvider
  
  ) {
    this.user_id = this.navParams.get('user_id');

    this.select_user_payment(this.user_id)
  }

  select_user_payment(user_id){
    this.apiServe.load_user_payment(user_id)
        .then((data) => {
          
          if(data == null){
            this.user_activate = 'ยังไม่ทำรายการการชำระเงิน';
          }else{
            this.user_activate = data[0].user_payment_act;
            if(this.user_activate == '1'){
              this.user_activate = 'รออนุมัติ';
              this.data_payment = data;
            }else if(this.user_activate == '2'){
              this.user_activate = 'ยืนยันการชำระเงินแล้ว';
              this.data_payment = data;
            }
          }

          
    })
  }
  
}
