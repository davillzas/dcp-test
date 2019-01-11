import { MainTabsPage } from './../main-tabs/main-tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
/**
 * Generated class for the BankQrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bank-qrcode',
  templateUrl: 'bank-qrcode.html',
})
export class BankQrcodePage {
  qr_code_id : any;
  user_id : any;
  customer_id : any;
  total_discount : any;
  qr_code_discount : any;
  user_discount_value : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private platform: Platform, public alertCtrl: AlertController, public apiServe : ApiProvider) {
    this.qr_code_id = this.navParams.get('qr_code_id');
    this.user_id = this.navParams.get('user_id');
    this.customer_id = this.navParams.get('customer_id');
    this.total_discount = this.navParams.get('total_discount');
    this.qr_code_discount = this.navParams.get('qr_code_discount');
    this.user_discount_value = this.navParams.get('user_discount_value');
  }

  get_main_page(app){
    window.location.href = app;
    this.navCtrl.push(MainTabsPage);
  }
  
  insert_qr_code_discount(qr_code_id,user_id,customer_id,total_discount,qr_code_discount,user_discount_value,bank_name,app){
    //console.log(qr_code_id + ' ' + user_id + ' ' + customer_id + ' ' + total_discount + ' ' + qr_code_discount + ' ' + user_discount_value + ' ' + bank_name);
    var discount_status = '2'
    var qr_code_active = '1'
    this.apiServe.insert_user_discount_bank(qr_code_id,user_id,customer_id,total_discount,qr_code_discount,user_discount_value,qr_code_active,discount_status,bank_name)
      .then((data) => {
        //console.log(data['msg'])
        var act = data['act']
        var massage = data['msg']  
            
        if(act != 2){
          let alert = this.alertCtrl.create({
            title: 'เกิดข้อผิดพลาด!',
            subTitle: massage,
            buttons: ['OK']
          });
          alert.present();
        }else{
          let alert = this.alertCtrl.create({
            title: 'บันทึกข้อมูลเรียบร้อย',
            subTitle: massage,
            buttons: ['OK']
          });
          alert.present();
          this.get_main_page(app)
        }
      })
  }

  check_user(qr_code_id,user_id,customer_id,total_discount,qr_code_discount,user_discount_value,bank_name,app){
    let confirm = this.alertCtrl.create({
      title: 'คุณแน่ใจหรือไม่ที่ต้องการจะทำรายการนี้?',
      message: 'รายการนี้จะถูกบันทึกลงในระบบ คุณแน่ใจหรือไม่ที่จะทำรายการนี้',
      buttons: [
        {
          text: 'ยืนยัน',
          handler: () => {
            var qr_code_active = 1;
            this.insert_qr_code_discount(qr_code_id,user_id,customer_id,total_discount,qr_code_discount,user_discount_value,bank_name,app)
          }
        },
        {
          text: 'ยกเลิก',
        }
      ]
    });
    confirm.present();
      //console.log(qr_code_id + ' ' + user_id + ' ' + customer_id + ' ' + total_discount + ' ' + qr_code_discount + ' ' + user_discount_value + ' ' + bank_name);
  }

  launchExternalApp(iosSchemaName: string, androidPackageName: string , bank_name : string){
    let app: string;
    if (this.platform.is('ios')) {
      app = iosSchemaName;
    } else if (this.platform.is('android')) {
      app = androidPackageName;
    }

    this.check_user(this.qr_code_id,this.user_id,this.customer_id,this.total_discount,this.qr_code_discount,this.user_discount_value,bank_name,app)
    //window.location.href = app;
    //this.navCtrl.push(MainTabsPage);

  }

  bank_kbank(){
    this.launchExternalApp('https://itunes.apple.com/th/app/k-plus/id361170631?l=th&mt=8', 'https://play.google.com/store/apps/details?id=com.kasikorn.retail.mbanking.wap' , 'kbank');
  }

  bank_bangkok(){
    this.launchExternalApp('https://itunes.apple.com/id/app/bualuang-mbanking/id660238716?mt=8', 'https://play.google.com/store/apps/details?id=com.bbl.mobilebanking'  , 'bangkok');
  }

  bank_ktb(){
    this.launchExternalApp('https://itunes.apple.com/th/app/ktb-netbank/id436753378?l=th&mt=8', 'https://play.google.com/store/apps/details?id=ktbcs.netbank'  , 'ktb');
  }

  bank_scb(){
    this.launchExternalApp('https://itunes.apple.com/dk/app/scb-easy/id568388474?mt=8', 'https://play.google.com/store/apps/details?id=com.scb.phone'  , 'scb');
  }

  bank_krungsri(){
    this.launchExternalApp('https://itunes.apple.com/th/app/kma-krungsri-mobile-app/id571873195?l=th&mt=8', 'https://play.google.com/store/apps/details?id=com.krungsri.kma'  , 'krungsri');
  }

  bank_goverment(){
    this.launchExternalApp('https://itunes.apple.com/th/app/mymo-by-gsb-mobile-banking/id987047466?l=th&mt=8', 'https://play.google.com/store/apps/details?id=com.mobilife.gsb.mymo'  , 'goverment');
  }

  bank_tmb(){
    this.launchExternalApp('https://itunes.apple.com/th/app/tmb-touch/id884079963?l=th&mt=8','https://play.google.com/store/apps/details?id=com.TMBTOUCH.PRODUCTION','tmb');
  };

  bank_alipay(){
    this.launchExternalApp('https://itunes.apple.com/us/app/alipay-simplify-your-life/id333206289?mt=8','https://play.google.com/store/apps/details?id=com.eg.android.AlipayGphone','alipay');
  };

  bank_wechat(){
    this.launchExternalApp('','https://play.google.com/store/apps/details?id=kr.co.kcp.wechatpaycheckout','wechat');
  };
  

}
