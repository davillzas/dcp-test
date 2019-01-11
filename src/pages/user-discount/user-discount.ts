import { Apidcp } from './../../providers/api/apidcp';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
//import { DatePipe } from "@angular/common";
import { ApiProvider } from './../../providers/api/api';
import { UserTotalDiscountPage } from './../user-total-discount/user-total-discount';
import { LoadingController,AlertController } from 'ionic-angular';

import { UserService } from '../../services/user-service';
/**
 * Generated class for the UserDiscountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-user-discount",
  templateUrl: "user-discount.html"
})
export class UserDiscountPage {
  user_id: any;
  data_topup: any;
  user_discount_code: any;
  user_discount_code_cancle: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiServe: ApiProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public appCtrl: App,
    public UserService: UserService,
    public Apidcp: Apidcp,
    //public datePipe: DatePipe
  ) {
    this.get_data_discount();
  }

  get_data_discount() {
    let loading = this.loadingCtrl.create({
      content: "Please wait..."
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1000);

    let user_data = this.UserService.User_data();
    user_data.then(result => {
      this.user_id = result.user_new_id;
      this.Apidcp.load_log_topup(this.user_id).then(data => {
        
        var log_messages = new Array();
        if (data == null || data == "") {
          log_messages.push({
            log_messages: "ไม่พบข้อมูล",
            log_amount: "0.00"
          });

          this.user_discount_code = log_messages;
        } else {
          this.data_topup = data;
          for (let index = 0; index < this.data_topup.length; index++) {
            let newDate = new Date(this.data_topup[index].user_payment_datetime);
           
            //console.log(this.datePipe.transform(this.data_topup[index].user_payment_datetime, "yyyy-MM-dd"));
            if (this.data_topup[index].user_payment_act == "1") {
              this.data_topup[index].user_payment_act = "รอการชำระเงิน";
            } else if (this.data_topup[index].user_payment_act == "2") {
              this.data_topup[index].user_payment_act = "ชำระเงินสำเร็จ";
            } else if (this.data_topup[index].user_payment_act == "3") {
              this.data_topup[index].user_payment_act = "เกิดปัญหาการเติมเงิน";
            }

            if ((this.data_topup[index].topup_lugent_id = "1")) {
              log_messages.push({
                log_messages:
                  "คุณได้ทำการเติมเงินโทรศัพท์ ผ่านระบบ : " +
                  this.data_topup[index].topup_h2h_name +
                  " ไปที่เบอร์โทรศัพท์ : " +
                  this.data_topup[index].mobile +
                  " เป็นจำนวนเงินทั้งหมด : " +
                  this.data_topup[index].topup_log_new_price +
                  " บาท (" +
                  this.data_topup[index].user_payment_act +
                  ")",
                log_date: newDate
              });
            } else if ((this.data_topup[index].topup_lugent_id = "2")) {
              log_messages.push({
                log_messages:
                  "คุณได้ทำการเติมเงินโทรศัพท์ ผ่านระบบ : " +
                  this.data_topup[index].topup_h2h_name +
                  " ไปที่เบอร์โทรศัพท์ : " +
                  this.data_topup[index].mobile +
                  " เป็นจำนวนเงินทั้งหมด : " +
                  this.data_topup[index].topup_log_new_price +
                  " บาท (" +
                  this.data_topup[index].user_payment_act +
                  ")",
                log_date: newDate
              });
            }
          }
          this.user_discount_code = log_messages;
        }
      });
    });
  }

  select_value_discount(user_discount_code) {
    this.navCtrl.push(UserTotalDiscountPage, {
      user_discount_code: user_discount_code
    });
  }

  edit_user_discount(user_discount_code) {
    let confirm = this.alertCtrl.create({
      title: "คุณแน่ใจหรือไม่ที่จะกู้คืนรายการนี้?",
      message:
        "รายการนี้จะถูกบันทึกลงในระบบ คุณแน่ใจหรือไม่ที่จะกู้คืนรายการนี้",
      buttons: [
        {
          text: "ยืนยัน",
          handler: () => {
            this.api_edit_user(user_discount_code);
          }
        },
        {
          text: "ยกเลิก",
          handler: () => {}
        }
      ]
    });
    confirm.present();
  }

  api_edit_user(user_discount_code) {
    this.apiServe.edit_user_discount(user_discount_code).then(data => {
      let value_edit = JSON.stringify(data);

      if (value_edit["act"] == 1) {
        let alert = this.alertCtrl.create({
          title: "ไม่สามารถบันทึกข้อมูลได้!",
          subTitle: "กรุณาติดต่อเจ้าหน้าที่",
          buttons: ["OK"]
        });
        alert.present();
      } else {
        let alert = this.alertCtrl.create({
          title: "ทำรายการสำเร็จ",
          subTitle: "ระบบได้แก้ไขข้อมูลของท่านเรียบร้อยแล้ว",
          buttons: [
            {
              text: "ยืนยัน",
              handler: () => {
                setTimeout(() => {
                  this.get_data_discount();
                }, 500);
              }
            }
          ]
        });
        alert.present();
      }
    });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.get_data_discount();
      refresher.complete();
    }, 2000);
  }
}
