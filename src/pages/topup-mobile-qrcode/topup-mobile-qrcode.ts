import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, App,Platform,ToastController } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { UserService } from '../../services/user-service';
import { File } from '@ionic-native/file';
import { FileTransfer ,FileTransferObject} from '@ionic-native/file-transfer';
import { MainTabsPage } from './../main-tabs/main-tabs';

declare var cordova: any;
/**
 * Generated class for the TopupMobileQrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-topup-mobile-qrcode",
  templateUrl: "topup-mobile-qrcode.html"
})
export class TopupMobileQrcodePage {
  data_insert_topup_mobile: any;
  payment_log_type: any;
  data_topup_log: any;
  data_topup_qr: any;
  qr_code: any;
  link: any;

  storageDirectory: string = "";
  private fileTransfer: FileTransferObject;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public Api: ApiProvider,
    public UserService: UserService,
    public alertCtrl: AlertController,
    public loaddingCtrl: LoadingController,
    public App: App,
    public file: File,
    private transfer: FileTransfer,
    public toastCtrl: ToastController
  ) {
    this.data_insert_topup_mobile = this.navParams.get(
      "data_insert_topup_mobile"
    );
    this.payment_log_type = this.navParams.get("payment_log_type");
    this.qr_code = this.data_insert_topup_mobile;

    if (this.payment_log_type == 1) {
      this.link = [
        {
          src: "https://customer.discountpercent.com/img/bank/bank_1.png",
          android:
            "https://play.google.com/store/apps/details?id=com.kasikorn.retail.mbanking.wap&hl=th",
          ios: "https://itunes.apple.com/th/app/k-plus/id361170631?l=th&mt=8"
        },
        {
          src: "https://customer.discountpercent.com/img/bank/bank_2.png",
          android:
            "https://play.google.com/store/apps/details?id=com.bbl.mobilebanking&hl=th",
          ios:
            "https://itunes.apple.com/th/app/bualuang-mbanking/id660238716?mt=8"
        },
        {
          src: "https://customer.discountpercent.com/img/bank/bank_3.png",
          android:
            "https://play.google.com/store/apps/details?id=ktbcs.netbank&hl=en_US",
          ios:
            "https://itunes.apple.com/th/app/krungthai-next/id436753378?l=th&mt=8"
        },
        {
          src: "https://customer.discountpercent.com/img/bank/bank_4.png",
          android:
            "https://play.google.com/store/apps/details?id=com.mobilife.gsb.mymo",
          ios:
            "https://itunes.apple.com/th/app/mymo-by-gsb-mobile-banking/id987047466?l=th&mt=8"
        },
        {
          src: "https://customer.discountpercent.com/img/bank/bank_5.png",
          android:
            "https://play.google.com/store/apps/details?id=com.scb.phone",
          ios: "https://itunes.apple.com/th/app/scb-easy/id568388474?mt=8"
        },
        {
          src: "https://customer.discountpercent.com/img/bank/bank_6.png",
          android:
            "https://play.google.com/store/apps/details?id=com.krungsri.kma",
          ios:
            "https://itunes.apple.com/th/app/kma-krungsri-mobile-app/id571873195?l=th&mt=8"
        },
        {
          src: "https://customer.discountpercent.com/img/bank/bank_7.png",
          android:
            "https://play.google.com/store/apps/details?id=th.co.thanachartbank.mbanking&hl=th",
          ios:
            "https://itunes.apple.com/th/app/thanachart-connect/id1097485544?l=th&mt=8"
        },
        {
          src: "https://customer.discountpercent.com/img/bank/bank_8.png",
          android:
            "https://play.google.com/store/apps/details?id=com.TMBTOUCH.PRODUCTION&hl=th",
          ios:
            "https://itunes.apple.com/th/app/tmb-touch/id884079963?mt=8"
        },
        {
          src: "https://customer.discountpercent.com/img/bank/bank_9.png",
          android:
            "https://play.google.com/store/apps/details?id=com.ccpp.baac&hl=th",
          ios:
            "https://itunes.apple.com/th/app/%E0%B8%98-%E0%B8%81-%E0%B8%AA-a-mobile/id1199267294?l=th&mt=8"
        }
      ];
    } else if (this.payment_log_type == 2) {
      this.link = [
        {
          src:
            "https://customer.discountpercent.com/img/icon_topup_payment/app-2.png",
          android:
            "https://play.google.com/store/apps/details?id=jp.naver.line.android&hl=th",
          ios: "https://itunes.apple.com/th/app/line/id443904275?l=th&mt=8"
        }
      ];
    } else if (this.payment_log_type == 4) {
      this.link = [
        {
          src:
            "https://customer.discountpercent.com/img/icon_topup_payment/app-4.png",
          android:
            "https://play.google.com/store/apps/details?id=th.co.truemoney.wallet&hl=th",
          ios:
            "https://itunes.apple.com/th/app/truemoney-wallet/id663885752?l=th&mt=8"
        }
      ];
    }
  }

  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  check_qr_topup() {
    this.Api.check_qr_topup(this.data_topup_log, this.data_topup_qr).then(
      data => {
        if (data["act"] == 1) {
          this.presentToast(data["msg"]);
        } else if (data["act"] == 2) {
          this.presentToast(data["msg"]);

          let loading = this.loaddingCtrl.create({
            content: "กรุณารอสักครู่..."
          });
          loading.present();

          setTimeout(() => {
            this.navCtrl.setRoot(MainTabsPage);
            loading.dismiss();
          }, 3000);
        }
      }
    );
  }

  go_home() {
    let loading = this.loaddingCtrl.create({
      content: "กรุณารอสักครู่..."
    });
    loading.present();

    setTimeout(() => {
      this.navCtrl.setRoot(MainTabsPage);
      loading.dismiss();
    }, 3000);
  }

  get_link(android, ios) {
    let app: string;
      if (this.platform.is("ios")) {
        app = ios;
      } else if (this.platform.is("android")) {
        app = android;
      }
      window.location.href = app;
  }
  

 
}
