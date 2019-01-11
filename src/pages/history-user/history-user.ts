import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { ApiProvider } from './../../providers/api/api';
/**
 * Generated class for the HistoryUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history-user',
  templateUrl: 'history-user.html',
})
export class HistoryUserPage {
  data_phone : any;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public device: Device ,public apiServe : ApiProvider) {
    this.get_phone();
  }

  get_phone(){
    var uuid = this.device.uuid;

    this.apiServe.get_phone(uuid).then((data) => {
      this.data_phone = data['data'];
      
    })
  }

}
