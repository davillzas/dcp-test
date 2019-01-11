import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from 'ionic-angular';
import {
  UserService
} from '../../services/user-service';
import {
  Clipboard
} from '@ionic-native/clipboard';
/**
 * Generated class for the LinkAdvisorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-link-advisor',
  templateUrl: 'link-advisor.html',
})
export class LinkAdvisorPage {
  user_phone: any;
  data_user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public UserService: UserService, public clipboard: Clipboard, public alertCtrl: AlertController) {
    this.get_phone_user();
  }

  get_phone_user() {
    this.data_user = this.UserService.User_data()

    this.data_user.then(result => {
      this.user_phone = result.user_new_phone;

    })
  }

  get_link() {
    this.clipboard.copy("https://customer.discountpercent.com/register/register_user_advisor/" + this.user_phone);

    this.clipboard.paste().then(
      (resolve: string) => {
        alert('Copy Link การแนะนำแล้ว')
      },
      (reject: string) => {
        alert('Error: ' + reject);
      }
    );
  }

}
