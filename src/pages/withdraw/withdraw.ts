import { MainTabsPage } from './../main-tabs/main-tabs';
import { WalletPage } from './../wallet/wallet';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController ,LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiProvider } from './../../providers/api/api';
import { UserService } from '../../services/user-service';
import { Apidcp } from "../../providers/api/apidcp";
/**
 * Generated class for the WithdrawPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-withdraw",
  templateUrl: "withdraw.html"
})
export class WithdrawPage {
  bank_number_check: any;
  chkeck_form: any;
  data_user: any;
  wallet: any;
  money: any;
  phone: any;
  form_withdown_prompay: FormGroup;
  form_withdown: FormGroup;
  user_id: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public apiServe: ApiProvider,
    public UserService: UserService,
    public loaddingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public Apidcp: Apidcp
  ) {
    this.bank_number_check = this.navParams.get("data");
    this.money = 0;
    this.form_withdown = formBuilder.group({
      tbd_code: ["", Validators.compose([Validators.required])],
      money: ["", Validators.compose([Validators.required])]
    });

    this.form_withdown_prompay = formBuilder.group({
      bank_withdown_prompay: [""],
      bank_number_prompay: [""],
      bank_name_withdown_prompay: [""],
      money_withdown_prompay: [""]
    });

    this.check_wallet();
  }

  check_wallet() {
    this.data_user = this.UserService.User_data();
    this.data_user.then(result => {
      this.user_id = result.user_new_id;
      this.phone = result.user_new_phone;
      this.Apidcp.get_point(this.user_id).then(data => {
        if (data == null) {
          this.wallet = 0;
        } else {
          this.wallet = data[0].user_new_coin;
        }
      });
    });
  }

  check_money(event: any) {
    let money_check = event.target.value;
    if (money_check > this.wallet) {
      let msg =
        "จำนวนเงินที่ต้องการถอน มากกว่า จำนวนเงินในกระเป๋าของท่านกรุณากรอก จำนวนเงินให้ถูกต้อง";
      this.alert_error(msg);
      this.money = 0;
    } else if (money_check < 0) {
      let msg = "ไม่สามารถใส่ จำนวนเงินติดลบได้";
      this.alert_error(msg);
      this.money = 0;
    }
  }

  onSubmit_withdown(value: any): void {
    if (this.form_withdown.valid) {
      var msg = "";
      window.localStorage.setItem("tbd_code", value.tbd_code);
      window.localStorage.setItem("money", value.money);

      var tbd_code = value.tbd_code;
      var money = value.money;

      if (tbd_code == "") {
        msg = "กรุณาเลือกบัญชีธนาคาร";
        this.alert_error(msg);
      } else {
        if (Number(money) > Number(this.wallet)) {
          msg =
            "ไม่สามารถถอนเงินออกจากระบบได้เนื่องจาก จำนวนเงินในกระเป๋า ไม่พอในการถอนเงิน";
          this.alert_error(msg);
        } else {
          this.check_pin(tbd_code, money);
        }
      }
    }
  }

  check_pin(tbd_code, money) {
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
          text: "ยืนยัน",
          handler: data => {
            this.Apidcp.checkpassword(this.phone, data["pin_wallet"]).then(
              data => {
                if (data["act"] == '1') {
                  this.alert_error_pin(data["msg"], tbd_code, money);
                } else if (data["act"] == '2') {
                  this.insert_withdown(tbd_code, money);
                }
              }
            );
          }
        },
        {
          text: "ยกเลิก",
          handler: data => {}
        }
      ]
    });
    prompt.present();
  }

  onSubmit_withdown_prompay(value: any): void {
    if (this.form_withdown_prompay.valid) {
      var msg = "";
      window.localStorage.setItem(
        "bank_withdown_prompay",
        value.bank_withdown_prompay
      );
      window.localStorage.setItem(
        "bank_number_prompay",
        value.bank_number_prompay
      );
      window.localStorage.setItem(
        "bank_name_withdown_prompay",
        value.bank_name_withdown_prompay
      );
      window.localStorage.setItem(
        "money_withdown_prompay",
        value.money_withdown_prompay
      );

      var bank_withdown_prompay = value.bank_withdown_prompay;
      var bank_number_prompay = value.bank_number_prompay;
      var bank_name_withdown_prompay = value.bank_name_withdown_prompay;
      var money_withdown_prompay = value.money_withdown_prompay;

      //console.log(bank_withdown_prompay + ' ' + bank_number_prompay +  ' ' + bank_name_withdown_prompay + ' ' + money_withdown_prompay);
      if (bank_withdown_prompay == "") {
        msg = "กรุณาเลือกบัญชีธนาคาร";
        this.alert_error(msg);
      } else if (bank_number_prompay == "") {
        msg = "กรุณากรอกเลขบัญชีธนาคาร";
        this.alert_error(msg);
      } else if (bank_name_withdown_prompay == "") {
        msg = "กรุณากรอกชื่อบัญชีธนาคาร";
        this.alert_error(msg);
      } else if (money_withdown_prompay == "") {
        msg = "กรุณากรอกจำนวนเงินที่ต้องการถอน";
        this.alert_error(msg);
      } else {
        if (Number(this.wallet) < Number(money_withdown_prompay)) {
          msg =
            "ไม่สามารถถอนเงินออกจากระบบได้เนื่องจาก จำนวนเงินในกระเป๋า ไม่พอในการถอนเงิน";
          this.alert_error(msg);
        } else {
          this.insert_withdown_bank_payment(
            bank_withdown_prompay,
            bank_number_prompay,
            bank_name_withdown_prompay,
            money_withdown_prompay,
            this.user_id
          );
        }
      }
    }
  }

  alert_error(msg) {
    let alert = this.alertCtrl.create({
      title: "เกิดข้อผิดพลาด!",
      subTitle: msg,
      buttons: ["OK"]
    });
    alert.present();
  }

  insert_withdown(tbd_code, money) {
    this.Apidcp.insert_withdown(this.user_id, tbd_code, money).then(data => {
      if (data["act"] == 1) {
        this.alert_error(data["msg"]);
      } else if (data["act"] == 2) {
        let loading = this.loaddingCtrl.create({
          content: "กรุณารอสักครู่..."
        });

        loading.present();

        setTimeout(() => {
          this.refresh();
          loading.dismiss();
        }, 3000);
      }
    });
  }

  insert_withdown_bank_payment(
    bank_withdown_prompay,
    bank_number_prompay,
    bank_name_withdown_prompay,
    money_withdown_prompay,
    user_id
  ) {
    this.apiServe
      .insert_withdown_bank_payment(
        bank_withdown_prompay,
        bank_number_prompay,
        bank_name_withdown_prompay,
        money_withdown_prompay,
        user_id
      )
      .then(data => {
        if (data["act"] == 1) {
          this.alert_error(data["msg"]);
        } else if (data["act"] == 2) {
          let loading = this.loaddingCtrl.create({
            content: "กรุณารอสักครู่..."
          });

          loading.present();

          setTimeout(() => {
            this.refresh();
            loading.dismiss();
          }, 3000);
        }
      });
  }

  refresh() {
    const toast = this.toastCtrl.create({
      message: "บันทึกข้อมูลสำเร็จ",
      showCloseButton: true,
      closeButtonText: "Ok"
    });
    toast.present();

    setTimeout(() => {
      this.navCtrl.setRoot(MainTabsPage);
      toast.dismiss();
    }, 1000);
  }

  alert_error_pin(msg, tbd_code, money) {
    let alert = this.alertCtrl.create({
      title: "เกิดปัญหา!",
      subTitle: msg,
      buttons: [
        {
          text: "ตกลง",
          handler: () => {
            this.check_pin(tbd_code, money);
          }
        }
      ]
    });
    alert.present();
  }
}
