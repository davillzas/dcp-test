import { WalletPage } from './../wallet/wallet';
import { StreamingPage } from './../streaming/streaming';
import { LoginPage } from './../login/login';
import {Component} from '@angular/core';
import {App,NavController,NavParams,Platform,AlertController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {CollectionsPage} from '../collections/collections';
import {FeedPage}from '../feed/feed';
import {AccountPage} from '../account/account';
import { UserService } from '../../services/user-service';
import { ScanQrcodePage } from './../scan-qrcode/scan-qrcode';

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-main-tabs',
  templateUrl: 'main-tabs.html'
})
export class MainTabsPage {
  
  data_user:any;
  public tabHome = HomePage;
  public tabCollections = CollectionsPage;
  public tabFeed = FeedPage;
  public tabAccount = AccountPage;
  public streaming = StreamingPage;
  public scan = ScanQrcodePage;
  //public wallet = WalletPage;


  constructor(public app:App , public nav: NavController, public navParams: NavParams, public UserService: UserService ,public platform: Platform ,public alertCtrl: AlertController) {
    platform.registerBackButtonAction(() => {
      if(this.nav.getActive().name === 'MainTabsPage'){
        let confirm = this.alertCtrl.create({
          title: 'ออกจากระบบ?',
          message: 'คุณแน่ใจหรือไม่ที่ต้องการที่จะออกจาก Discount',
          buttons: [
            {
              text: 'ยืนยัน',
              handler: () => {
                this.platform.exitApp(); //Exit from app
              }
            },
            {
              text: 'ยกเลิก',
              handler: () => {
               
              }
            }
          ]
        });
        confirm.present();
      }else{
        nav.pop();  
      }
    });
    this.get_user_data();
  }

  get_user_data(){
    this.data_user = this.UserService.User_data()

    this.data_user.then(result =>{
      
      var value_data = result;
      value_data = result;
      if(value_data == null){
        this.nav.push(LoginPage);
      }
    })
  }
}