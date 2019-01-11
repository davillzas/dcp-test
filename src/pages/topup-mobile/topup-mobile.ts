import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, App , ToastController } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { UserService } from '../../services/user-service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { TopupMobileQrcodePage } from '../topup-mobile-qrcode/topup-mobile-qrcode';
import { MainTabsPage } from './../main-tabs/main-tabs';
import { Apidcp } from "../../providers/api/apidcp";
/**
 * Generated class for the TopupMobilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-topup-mobile",
  templateUrl: "topup-mobile.html"
})
export class TopupMobilePage {
  data_h2h: any;
  data_money: any;
  swit_lot: any = 1;
  input_show: any = 1;
  payment_type_show: any = 1;
  topup_amount: any;
  topup_telephone: any;
  topup: FormGroup;
  data_user: any;
  user_id: any;
  name: any;
  phone: any;
  data_payment: any;
  wallet: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public Api: ApiProvider,
    public formBuilder: FormBuilder,
    public UserService: UserService,
    public alertCtrl: AlertController,
    public loaddingCtrl: LoadingController,
    public App: App,
    public toastCtrl: ToastController,
    public Apidcp: Apidcp
  ) {

    this.data_h2h = this.navParams.get("data_h2h");
  
    if (this.data_h2h['topup_h2h_id'] == '5'){
      this.data_payment = [
        {
          payment_id: "1",
          pic:
            "https://customer.discountpercent.com/img/icon_topup_payment/app-1.png"
        },
        {
          payment_id: "2",
          pic:
            "https://customer.discountpercent.com/img/icon_topup_payment/app-2.png"
        },
        {
          payment_id: "10",
          pic:
            "https://customer.discountpercent.com/img/icon_topup_payment/app-10.png"
        },
        {
          payment_id: "4",
          pic:
            "https://customer.discountpercent.com/img/icon_topup_payment/app-4.png"
        },
        {
          payment_id: "5",
          pic:
            "https://customer.discountpercent.com/img/icon_topup_payment/app-5.png"
        },
        {
          payment_id: "6",
          pic:
            "https://customer.discountpercent.com/img/icon_topup_payment/app-6.png"
        },
        {
          payment_id: "7",
          pic:
            "https://customer.discountpercent.com/img/icon_topup_payment/app-7.png"
        },
       
        {
          payment_id: "9",
          pic:
            "https://customer.discountpercent.com/img/icon_topup_payment/app-9.png"
        }
      ];
    }else{
      this.data_payment = [
        {
          payment_id: "1",
          pic:
            "https://customer.discountpercent.com/img/icon_topup_payment/app-1.png"
        },
        {
          payment_id: "2",
          pic:
            "https://customer.discountpercent.com/img/icon_topup_payment/app-2.png"
        },
        {
          payment_id: "10",
          pic:
            "https://customer.discountpercent.com/img/icon_topup_payment/app-10.png"
        },
        {
          payment_id: "4",
          pic:
            "https://customer.discountpercent.com/img/icon_topup_payment/app-4.png"
        },
        {
          payment_id: "5",
          pic:
            "https://customer.discountpercent.com/img/icon_topup_payment/app-5.png"
        },
        {
          payment_id: "6",
          pic:
            "https://customer.discountpercent.com/img/icon_topup_payment/app-6.png"
        },
        {
          payment_id: "7",
          pic:
            "https://customer.discountpercent.com/img/icon_topup_payment/app-7.png"
        },
        {
          payment_id: "8",
          pic:
            "https://customer.discountpercent.com/img/icon_topup_payment/app-8.png"
        },
        {
          payment_id: "9",
          pic:
            "https://customer.discountpercent.com/img/icon_topup_payment/app-9.png"
        }
      ];
    }
   

    
    this.check_wallet();

   

    this.get_money(this.data_h2h["topup_h2h_id"]);

    this.topup = formBuilder.group({
      topup_amount: ["", Validators.compose([Validators.required])],
      topup_telephone: [
        "",
        Validators.compose([Validators.required, Validators.minLength(10)])
      ]
    });
  }

  get_money(topup_h2h_id) {
    this.Api.get_money(topup_h2h_id).then(data => {
      //alert(JSON.stringify(data))
      this.data_money = data;
      //console.log(this.data_money);
    });
  }

  select_amount(amount) {
    this.swit_lot = 2;
    this.payment_type_show = 1;
    this.input_show = 1;
    this.topup_amount = amount;
  }

  onSubmit_topup(value: any): void {
    this.topup_amount = value.topup_amount;
    this.topup_telephone = value.topup_telephone;

    this.payment_type_show = 2;

    //this.check_pin_user(topup_amount,topup_telephone);
  }

  topup_mobile(payment_id) {
    var payment_log_type = payment_id;

    if (
      payment_log_type == 1 ||
      payment_log_type == 2 ||
      payment_log_type == 8
    ) {
      if (payment_log_type != 8) {
        this.check_pin_user(
          payment_log_type,
          this.topup_amount,
          this.topup_telephone
        );
      } else {
        if (Number(this.topup_amount) > Number(this.wallet)) {
          let msg = "ไม่สามารถทำรายการได้เนื่องจาก ยอด DPC Reword ไม่เพียงพอในการชำระเงินรายการนี้";
          this.alert_msg_insert_transfer_user(msg);
        } else {
          this.check_pin_user(payment_log_type, this.topup_amount, this.topup_telephone);
        }
      }
    } else {
      let msg = "ขออภัย บริการชำระเงินนี้ ยังไม่เปิดให้บริการ";
      this.alert_msg_insert_transfer_user(msg);
    }
  }

  alert_msg_insert_transfer_user(msg) {
    const confirm = this.alertCtrl.create({
      title: "เกิดข้อผิดพลาด",
      message: msg,
      buttons: [
        {
          text: "ตกลง",
          handler: () => {}
        }
      ]
    });
    confirm.present();
  }

  check_wallet() {
    this.data_user = this.UserService.User_data();
    this.data_user.then(result => {
      this.user_id = result.user_new_id;
      this.Apidcp.get_point(this.user_id).then(data => {
        if (data == null) {
          this.wallet = 0;
        } else {
          this.wallet = data[0].user_new_coin;
        }
      });
    });
  }

  check_pin_user(payment_log_type, topup_amount, topup_telephone) {
    this.data_user = this.UserService.User_data();
    this.data_user.then(result => {

      this.user_id = result.user_new_id;
      this.phone = result.user_new_phone;

      this.check_pin(this.phone, topup_amount, topup_telephone, payment_log_type);
    });
  }

  insert_pin(phone, topup_amount, topup_telephone, payment_log_type) {
    let prompt = this.alertCtrl.create({
      title: "คุณยังไม่ได้ยืนยันตัวตนอย่างถูกต้อง",
      message: "กรุณาเพิ่ม PIN 6 หลัก เพื่อใช้ในการยืนยันการชำระเงิน",
      inputs: [
        {
          name: "pin",
          placeholder: "กรุณาเพิ่มข้อมูล PIN 6 หลัก",
          type: "password"
        }
      ],
      buttons: [
        {
          text: "ยกเลิก",
          handler: data => {}
        },
        {
          text: "บันทึก",
          handler: data => {
            if (data["pin"].length < 6) {
              var msg = "กรุณาใส่ pin ให้ครบ 6 หลัก";
              this.alert_error_pin(
                msg,
                topup_amount,
                topup_telephone,
                payment_log_type
              );
            } else {
              this.insert_pin_user(
                data["pin"],
                phone,
                topup_amount,
                topup_telephone,
                payment_log_type
              );
            }
          }
        }
      ]
    });
    prompt.present();
  }

  insert_pin_user(pin, phone, topup_amount, topup_telephone, payment_log_type) {
    this.Api.insert_pin_user(pin, phone).then(data => {
      if (data["act"] == 1) {
        var msg = "ไม่สามารถเพิ่ม Pin ได้ กรุณาลองใหม่อีกครั้ง";
      } else if (data["act"] == 2) {
        this.check_pin(phone, topup_amount, topup_telephone, payment_log_type);
      }
    });
  }

  check_pin(phone, topup_amount, topup_telephone, payment_log_type) {
    let prompt = this.alertCtrl.create({
      title: "ระบบตรวจสอบการจ่ายเงิน",
      message: "กรุณากรอก Password เพื่อใช้ในการยืนยันการชำระเงิน",
      inputs: [
        {
          name: "pin_wallet",
          placeholder: "กรุณาเพิ่มข้อมูล Password",
          type: "password"
        }
      ],
      buttons: [

        {
          text: 'ยืนยัน',
          handler: data => {
            this.Apidcp.checkpassword(phone, data["pin_wallet"]).then((data) => {
              if (data["act"] == 1) {
                this.alert_error_pin(
                  data["msg"],
                  topup_amount,
                  topup_telephone,
                  payment_log_type
                );
              } else if (data["act"] == 2) {
                this.onsubmit_topup_mobile(
                  topup_amount,
                  topup_telephone,
                  payment_log_type
                );
              }
            });
          }
        },
        {
          text: 'ยกเลิก',
          handler: data => {

          }
        }
      ]
    });
    prompt.present();
  }

  

  alert_error_pin(msg, topup_amount, topup_telephone, payment_log_type) {
    let alert = this.alertCtrl.create({
      title: "เกิดปัญหา!",
      subTitle: msg,
      buttons: [
        {
          text: "ตกลง",
          handler: () => {
            this.check_pin_user(
              topup_amount,
              topup_telephone,
              payment_log_type
            );
          }
        }
      ]
    });
    alert.present();
  }

  onsubmit_topup_mobile(topup_amount, topup_telephone, payment_log_type) {
    var topup_h2h_typeid = this.data_h2h["topup_h2h_typeid"];
    var topup_h2h_name = this.data_h2h["topup_h2h_name"];
    var topup_h2h_type = this.data_h2h["topup_h2h_type"];
    var topup_h2h_discount = this.data_h2h["topup_h2h_discount"];
    var topup_h2h_id = this.data_h2h["topup_h2h_id"];


   

    var data_topup = [
      {
        user_detail_id: this.user_id,
        topup_h2h_id: topup_h2h_id,
        topup_lugent_id: topup_h2h_type,
        payment_log_type: payment_log_type,
        topup_amount: topup_amount,
        topup_phone: topup_telephone,
      }
    ];

    if (payment_log_type != "8") {
      let loading = this.loaddingCtrl.create({
        content: "กรุณารอสักครู่..."
      });

      loading.present();

      this.Apidcp.insert_topup_mobile(data_topup).then(data => {
        if (data["act"] == '1') {
          loading.dismiss();

          let alert = this.alertCtrl.create({
            title: "เกิดข้อผิดพลาด!",
            subTitle: data["msg"],
            buttons: ["OK"]
          });
          alert.present();

          setTimeout(() => {
            loading.dismiss();
          }, 1000);
        } else {
          setTimeout(() => {
            var data_insert_topup_mobile = data["data"];
            this.App.getRootNav().push(TopupMobileQrcodePage, {
              data_insert_topup_mobile: data_insert_topup_mobile,
              payment_log_type: payment_log_type
            });
            loading.dismiss();
          }, 3000);
        }
      });
    } else {
      let loading = this.loaddingCtrl.create({
        content: "กรุณารอสักครู่..."
      });

      loading.present();

      this.Apidcp.insert_topup_mobile_reword(data_topup).then(data => {
        if (data["act"] == "1") {
          loading.dismiss();
          this.presentToast(data["msg"]);
          setTimeout(() => {
            this.navCtrl.setRoot(MainTabsPage);
            loading.dismiss();
          }, 1000);
        } else {
          this.presentToast(data["msg"]);
          setTimeout(() => {
            this.navCtrl.setRoot(MainTabsPage);
            loading.dismiss();
          }, 1000);
        }
      });
    }
  }

  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
