import { QrCodeDiscoutPage } from './../qr-code-discout/qr-code-discout';
import { Component } from '@angular/core';
import {IonicPage,App, NavController,NavParams,LoadingController , AlertController ,Platform} from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { UserService } from '../../services/user-service';
/**
 * Generated class for the ScanQrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan-qrcode',
  templateUrl: 'scan-qrcode.html',
})
export class ScanQrcodePage {
  scannedCode = null;
  User_data : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public barcodeScanner: BarcodeScanner , public apiServe : ApiProvider , public app:App , public loaddingCtrl : LoadingController
    , public alertCtrl: AlertController,  public UserService: UserService, public platform: Platform) {

      this.User_data = this.UserService.User_data();
    this.scan(); 
  }

  link(){
    this.launchExternalApp('https://itunes.apple.com/us/app/tbd-sure/id1435165707?mt=8','https://play.google.com/store/apps/details?id=com.cash2coin_wallet&hl=en_US'); 
  }
  scan(){
    this.User_data.then(result =>{
      this.barcodeScanner.scan().then(barcodeData => {
        this.scannedCode = barcodeData.text;
        this.get_discount(this.scannedCode);
      }, (err) => {
          console.log('Error: ', err);
      });
    });
  }

  launchExternalApp(iosSchemaName: string, androidPackageName: string){
    let app: string;
    if (this.platform.is('ios')) {
      app = iosSchemaName;
    } else if (this.platform.is('android')) {
      app = androidPackageName;
    }
    window.location.href = app;
  }

  get_discount(scanercode_id){
        this.apiServe.check_qrcode_payment(scanercode_id)
        .then((data) => {
          var act = data['act'];
          var msg = data['msg'];
          this.show_success_qrcode(act,msg,scanercode_id);
        })
   
  }

    show_success_qrcode(act,msg,scanercode_id){
      console.log('test');
      if(act == 1){
        let alert = this.alertCtrl.create({
          title: 'เกิดข้อผิดพลาด!',
          subTitle: msg,
          buttons: ['OK']
        });
        alert.present();
      }else{
    
        this.app.getRootNav().push(QrCodeDiscoutPage, {data_qrcode : scanercode_id});
      }
    }

}
