import { WithdrawPage } from './../withdraw/withdraw';
import { Apidcp } from './../../providers/api/apidcp';
import { EditAccountPage } from './../edit-account/edit-account';
import { CheckLoginPage } from './../check-login/check-login';
import { MainTabsPage } from './../main-tabs/main-tabs';
import { LinkAdvisorPage } from './../link-advisor/link-advisor';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { LoadingController,AlertController,App } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { UserService } from '../../services/user-service';
import { LoginPage } from './../login/login';
import { UserDiscountPage } from './../user-discount/user-discount';
import { UserCheckPaymentPage } from './../user-check-payment/user-check-payment';
import { ApiProvider } from './../../providers/api/api';

//import { QrCodeDiscoutPage } from '../qr-code-discout/qr-code-discout';

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: "page-account",
  templateUrl: "account.html"
})
export class AccountPage {
  data_user: any;
  color: any;
  name: any;
  user_status: any;
  value_data: any;
  keys: String[];
  User_data: any;
  user_id: any;
  point: any;
  user_pic: any;

  constructor(
    public nav: NavController,
    public UserService: UserService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public apiServe: ApiProvider,
    public device: Device,
    public Apidcp: Apidcp
  ) {
    let loader = this.loadingCtrl.create({ content: "กรุณารอสักครู่..." });

    loader.present();
    this.get_user_data();
    setTimeout(() => {
      loader.dismiss();
    }, 1000);
  }

  get_user_data() {
    this.data_user = this.UserService.User_data();

    this.data_user.then(result => {
      this.user_status = result.user_activate;
      this.user_pic = result.user_new_photo;
      this.user_id = result.user_new_id;
      this.name = result.user_new_fname + " " + result.user_new_lname;
      //this.point = result.user_new_coin;
      this.get_poin();

      this.value_data = result;

      if (this.value_data == null) {
        this.nav.push(LoginPage);
      }
    });
  }

  get_poin() {
    this.Apidcp.get_point(this.user_id).then(data => {
      if (data == null) {
        this.point = 0;
      } else {
        this.point = data[0].user_new_coin;
      }
    });
  }

  user_distcount() {
    this.nav.push(UserDiscountPage);
  }

  user_payment(user_id) {
    this.app.getRootNav().push(UserCheckPaymentPage, { user_id: user_id });
  }

  link_advisor() {
    this.nav.push(LinkAdvisorPage);
  }

  exit() {
    let confirm = this.alertCtrl.create({
      title: "คุณแน่ใจหรือไม่ที่จะออกจากระบบ ?",
      message: "เมื่อกดยืนยันระบบจะทำการ ออกจากระบบ",
      buttons: [
        {
          text: "ยืนยัน",
          handler: () => {
            //this.data_user = this.UserService.clear_user_data();
            this.logout();
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

  edit_logout(login_id) {
    this.apiServe.edit_logout(login_id).then(data => {
      if (data["act"] == 1) {
        let alert = this.alertCtrl.create({
          title: "เกิดข้อผิดพลาด!",
          subTitle: data["msg"],
          buttons: ["OK"]
        });
        alert.present();
      } else {
        this.logout();
      }
    });
  }

  logout() {
    this.data_user = this.UserService.clear_user_data();

    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: "กรุณารอสักครู่ระบบกำลังดำเนินการ...",
      duration: 3000
    });

    loading.present();
    setTimeout(() => {
      this.app.getRootNav().setRoot(LoginPage);
    }, 1000);
  }

  clear_user() {
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: "กรุณารอสักครู่ระบบกำลังดำเนินการ...",
      duration: 3000
    });

    loading.present();
    location.reload();
  }

  withdraw() {
    this.app.getRootNav().push(WithdrawPage);
  }

  doRefresh(refresher) {
    let data_user = this.UserService.User_data();
    data_user.then(result => {
      var user_id = result.user_new_id;

      this.Apidcp.refresh_users(user_id).then(data => {
        var user_data = data[0];

        var remove_user_data = this.UserService.clear_user_data();
        if (remove_user_data == "1") {
          setTimeout(() => {
            let check_user = this.UserService.Get_data(user_data);
            check_user.then(result => {
              if (result != null) {
                setTimeout(() => {
                  this.get_user_data();
                }, 1000);
              }
            });
          }, 1000);
        }
      });

      setTimeout(() => {
        refresher.complete();
      }, 2000);
    });
  }

  edit_account() {
    var user_id = this.user_id;

    this.app.getRootNav().push(EditAccountPage, { user_id: user_id });
  }

  call_center() {
    window.location.href = "http://line.me/ti/p/@pbp0928s";
  }

  report_user(){
    window.location.href = "https://customer.discountpercent.com/report";
  }
}
