import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
/**
 * Generated class for the CustomerPicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-pic',
  templateUrl: 'customer-pic.html',
})
export class CustomerPicPage {
  customer_pic_detail : any;

  constructor(public navCtrl: NavController, public navParams: NavParams , public photoViewer : PhotoViewer) {
    this.get_customer_pic()
  }

  get_customer_pic(){
     this.customer_pic_detail = this.navParams.get('customer_pic_detail')
  } 

  show_pic(pic){
    var pic_data = String(pic);
    this.photoViewer.show(pic_data);
  }
}
