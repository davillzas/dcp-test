import { WalletPage } from './../pages/wallet/wallet';
import { CheckLoginPage } from './../pages/check-login/check-login';
import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
// import pages
import { SignUpPage } from './../pages/sign-up/sign-up';
import { LoginPage } from '../pages/login/login';
import { HomePage } from './../pages/home/home';
import { ScanQrcodePage } from './../pages/scan-qrcode/scan-qrcode';
import { UserPaymentPage } from './../pages/user-payment/user-payment';
import { QrCodeDiscoutPage } from '../pages/qr-code-discout/qr-code-discout';
import { MainTabsPage } from '../pages/main-tabs/main-tabs';
import { AccountPage } from './../pages/account/account';
import { UserDiscountPage } from './../pages/user-discount/user-discount';
import { BankQrcodePage } from './../pages/bank-qrcode/bank-qrcode';
import { TopupH2hPage } from './../pages/topup-h2h/topup-h2h';
import { TopupMobileQrcodePage } from '../pages/topup-mobile-qrcode/topup-mobile-qrcode';
import { WithdrawPage } from "../pages/withdraw/withdraw";

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  public rootPage:any;

  public nav:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.rootPage = CheckLoginPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
