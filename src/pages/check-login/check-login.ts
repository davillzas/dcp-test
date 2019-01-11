import { MainTabsPage } from './../main-tabs/main-tabs';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , App , LoadingController , AlertController} from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { Device } from '@ionic-native/device';
import { UserService } from '../../services/user-service';

/**
 * Generated class for the CheckLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-check-login',
  templateUrl: 'check-login.html',
})


export class CheckLoginPage {
  User_data : any;
  constructor(public navCtrl: NavController, public navParams: NavParams , public api : ApiProvider ,public device: Device , public app:App ,public loaddingCtrl : LoadingController,
    public UserService: UserService,public alertCtrl: AlertController ) {
      this.check_login();
  }

  check_login() {
    setTimeout(() => {

      this.User_data = this.UserService.User_data()
      this.User_data.then(result => {
        if (result != null) {
          this.login();
        } else {
          this.login_page();
        }
      })
    }, 2000);
  }

  login_page() {
    this.navCtrl.setRoot(LoginPage);
  }

  login() {
    this.navCtrl.setRoot(MainTabsPage);

  }

}
