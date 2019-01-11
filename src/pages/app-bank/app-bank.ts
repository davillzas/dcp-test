import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, App, Platform, ToastController } from 'ionic-angular';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { ApiProvider } from "./../../providers/api/api";
import { QrCodeDiscoutPage } from "./../qr-code-discout/qr-code-discout";
/**
 * Generated class for the AppBankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-app-bank",
  templateUrl: "app-bank.html"
})
export class AppBankPage {
  link: any;
  scannedCode = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public barcodeScanner: BarcodeScanner,
    public apiServe: ApiProvider,
    public app: App,
    public alertCtrl: AlertController
  ) {
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
        android: "https://play.google.com/store/apps/details?id=com.scb.phone",
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
        ios: "https://itunes.apple.com/th/app/tmb-touch/id884079963?mt=8"
      },
      {
        src: "https://customer.discountpercent.com/img/bank/bank_9.png",
        android:
          "https://play.google.com/store/apps/details?id=com.ccpp.baac&hl=th",
        ios:
          "https://itunes.apple.com/th/app/%E0%B8%98-%E0%B8%81-%E0%B8%AA-a-mobile/id1199267294?l=th&mt=8"
      },
      {
        src:
          "https://customer.discountpercent.com/img/icon_topup_payment/app-2.png",
        android:
          "https://play.google.com/store/apps/details?id=jp.naver.line.android&hl=th",
        ios: "https://itunes.apple.com/th/app/line/id443904275?l=th&mt=8"
      },
      {
        src:"https://customer.discountpercent.com/img/icon_topup_payment/app-8.png",
        android: "scan",
        ios: "scan"
      },
      {
        src:"https://customer.discountpercent.com/img/icon_topup_payment/app-9.png",
        android: "https://play.google.com/store/apps/details?id=com.cash2coin_wallet&hl=en_US",
        ios: "https://itunes.apple.com/us/app/tbd-sure/id1435165707?mt=8"
      }
    ];
  }

  get_link(android, ios) {
    if (android == "scan" || ios == "scan") {
      this.barcodeScanner.scan().then(
        barcodeData => {
          this.scannedCode = barcodeData.text;
          this.get_discount(this.scannedCode);
        },
        err => {
          console.log("Error: ", err);
        }
      );
    } else {
      let app: string;
      if (this.platform.is("ios")) {
        app = ios;
      } else if (this.platform.is("android")) {
        app = android;
      }
      window.location.href = app;
    }
  }

  get_discount(scanercode_id) {
    this.apiServe.check_qrcode_payment(scanercode_id).then(data => {
      var act = data["act"];
      var msg = data["msg"];
      this.show_success_qrcode(act, msg, scanercode_id);
    });
  }

  show_success_qrcode(act, msg, scanercode_id) {
    console.log("test");
    if (act == 1) {
      let alert = this.alertCtrl.create({
        title: "เกิดข้อผิดพลาด!",
        subTitle: msg,
        buttons: ["OK"]
      });
      alert.present();
    } else {
      this.app
        .getRootNav()
        .push(QrCodeDiscoutPage, { data_qrcode: scanercode_id });
    }
  }
}
