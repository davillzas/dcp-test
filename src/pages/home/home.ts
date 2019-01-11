import { AppBankPage } from './../app-bank/app-bank';
import { WithdrawPage } from './../withdraw/withdraw';
import { CustomerDetailPage } from './../customer-detail/customer-detail';
import { MainTabsPage } from './../main-tabs/main-tabs';
import {Component} from '@angular/core';
import {IonicPage,App, NavController,NavParams,LoadingController,Platform , AlertController} from 'ionic-angular';
import {PlaceService} from '../../services/place-service';
import {SelectLocationPage} from '../select-location/select-location';
import {PlacesPage} from '../places/places';
import {PlaceDetailPage} from '../place-detail/place-detail';
import {SearchPage} from '../search/search';
import {BookmarksPage} from '../bookmarks/bookmarks';
import {MapPage} from '../map/map';
import {NearbyPage} from '../nearby/nearby';
import { ApiProvider } from './../../providers/api/api';
//import { GroupPage } from './../group/group';
import { CollectionsPage } from '../collections/collections';
import { LocationHomePage } from '../location-home/location-home';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { QrCodeDiscoutPage } from '../qr-code-discout/qr-code-discout';
import { UserService } from '../../services/user-service';
import { Storage } from '@ionic/storage';
import { UserPaymentPage } from './../user-payment/user-payment';
import { ApiCategoryProvider } from './../../providers/api-category/api-category';
import { Apidcp } from "../../providers/api/apidcp";

import { TopupH2hPage } from '../topup-h2h/topup-h2h';

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  // current location
  public currentLocation = "New York, USA";

  // list popular places
  public popularPlaces: any;
  value_city: any;
  city_id: string;
  city_name: string;
  city_name_map: string;
  location_map: any;
  catagoryList: any;
  scannedCode = null;
  data_qr_code: any;
  city: any;
  User_data: any;
  slide: any;
  value_icon: any;
  user_id: any;
  point: any;
  unitlevel: any;

  constructor(
    public nav: NavController,
    public placeService: PlaceService,
    public app: App,
    public navParams: NavParams,
    public apiServe: ApiProvider,
    public barcodeScanner: BarcodeScanner,
    public http: Http,
    public loaddingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public UserService: UserService,
    public storage: Storage,
    public apiCategory: ApiCategoryProvider,
    public Apidcp: Apidcp,
    public platform: Platform
  ) {
    this.User_data = this.UserService.User_data();
    this.User_data.then(result => {
      this.user_id = result.user_new_id;
      this.city_name = "เลือกการให้บริการจากจังหวัด";
      this.load_city();
      this.load_category();
      this.load_icon();
      this.load_slides();
    });
  }

  load_icon() {
    this.apiServe.load_icon().subscribe(data => {
      this.value_icon = data;
    });
  }

  load_slides() {
    this.Apidcp.load_slides().subscribe(data => {
      this.slide = data;
    });
  }

  load_city() {
    this.apiServe.get_city().subscribe(data => {
      this.value_city = data;
      this.city_id = null;
    });
  }

  show_city_id(selectedValue: any) {
    //this.load_category(selectedValue)
    this.city_id = selectedValue;
  }

  load_category() {
    //if(city_id == null){

    this.apiCategory.load_category().subscribe(data => {
      this.catagoryList = data;
    });
  }

  // go to select location page
  selectLocation() {
    this.app.getRootNav().push(SelectLocationPage);
  }

  // go to places
  viewPlaces() {
    this.app.getRootNav().push(PlacesPage);
  }

  // view a place
  viewPlace(id) {
    this.app.getRootNav().push(PlaceDetailPage, { id: id });
  }

  // go to search page
  goToSearch() {
    this.app.getRootNav().push(SearchPage);
  }

  // go to bookmarks page
  goToBookmarks() {
    this.app.getRootNav().push(BookmarksPage);
  }

  // view map
  goToMap() {
    this.app.getRootNav().push(MapPage);
  }

  // view nearby page
  goToNearBy() {
    this.app.getRootNav().push(NearbyPage);
  }

  viewGroup(category) {
    if (category.category_id == "") {
      this.alert_msg("กรุณาเลือกจังหวัดที่มีบริการ");
    } else {
      this.app.getRootNav().push(CollectionsPage, {
        category_id: category.category_id,
        category_name: category.category_name,
        city_id: this.city_id
      });
    }
  }

  goTo_location_home() {
    this.app.getRootNav().push(LocationHomePage, {
      city_id: this.city_id,
      city_name: this.city_name,
      location_map: this.location_map
    });
  }

  refresh_user() {
    let loading = this.loaddingCtrl.create({
      spinner: "hide",
      content: "Loading Please Wait..."
    });

    loading.present();

    this.User_data = this.UserService.User_data();
    this.User_data.then(result => {
      var user_id = result.user_new_id;

      this.Apidcp.refresh_users(user_id).then(data => {
        var user_data = data[0];
        var remove_user_data = this.UserService.clear_user_data();
        if (remove_user_data == "1") {
          setTimeout(() => {
            let check_user = this.UserService.Get_data(user_data);
            check_user.then(result => {
              if (result != null) {
                setTimeout(() => {
                  this.nav.setRoot(MainTabsPage);
                }, 1000);

                setTimeout(() => {
                  loading.dismiss();
                }, 1000);
              }
            });
          }, 1000);
        }
      });
      setTimeout(() => {}, 2000);
    });
  }

  startVideo() {
    window.location.href =
      " http://vip.login.in.th:1935/dcpchannel/dcpchannel/playlist.m3u8";
  }

  launchExternalApp(iosSchemaName: string, androidPackageName: string) {
    let app: string;
    if (this.platform.is("ios")) {
      app = iosSchemaName;
    } else if (this.platform.is("android")) {
      app = androidPackageName;
    }
    window.location.href = app;
  }

  true_wallet() {
    this.launchExternalApp(
      "https://itunes.apple.com/us/app/truemoney-wallet/id663885752?mt=8",
      "https://play.google.com/store/apps/details?id=th.co.truemoney.wallet&hl=th"
    );
  }

  custoemr_detail() {
    var customer_id = "1142";
    this.app
      .getRootNav()
      .push(CustomerDetailPage, { customer_id: customer_id });
  }

  custoemr_detail_id_3706() {
    var customer_id = "3706";
    this.app
      .getRootNav()
      .push(CustomerDetailPage, { customer_id: customer_id });
  }
  custoemr_detail_id_3596() {
    var customer_id = "3596";
    this.app
      .getRootNav()
      .push(CustomerDetailPage, { customer_id: customer_id });
  }
  custoemr_detail_id_3603() {
    var customer_id = "3603";
    this.app
      .getRootNav()
      .push(CustomerDetailPage, { customer_id: customer_id });
  }

  link_event(id) {
    switch (id) {
      case "2":
        window.location.href = "https://line.me/R/ti/p/%40swm6951k";
        break;
      case "3":
        window.location.href = "https://line.me/R/ti/p/%40zrm1756x";
        break;
      case "4":
        window.location.href = "https://muaythaiticket.asia";
        break;

      case "5":
        window.location.href = "https://line.me/R/ti/p/%40idf4922m";
        break;
      case "6":
        window.location.href = "https://customer.discountpercent.com/order";
        break;
      case "7":
        window.location.href = "https://line.me/R/ti/p/%40ivm4343v";
        break;
      case "8":
        this.launchExternalApp(
          "https://itunes.apple.com/us/app/tbd-sure/id1435165707?mt=8",
          "https://play.google.com/store/apps/details?id=com.cash2coin_wallet&hl=en_US"
        );
        break;
      case "9":
        this.app.getRootNav().push(TopupH2hPage);
        break;
      case "11":
        window.location.href = "http://dcpship.com/";
        break;
      case "12":
        this.launchExternalApp(
          "https://itunes.apple.com/ae/app/skype-for-iphone/id304878510?mt=8",
          "https://play.google.com/store/apps/details?id=com.skype.m2&hl=th"
        );
        break;
      case "13":
        window.location.href = "http://www.dcpmall.com";
        break;
      case "14":
        this.launchExternalApp(
          "https://itunes.apple.com/us/app/radio-garden-live/id1339670993?mt=8",
          "https://play.google.com/store/apps/details?id=com.jonathanpuckey.radiogarden&hl=th"
        );
        break;
      case "17":
        this.launchExternalApp(
          "https://itunes.apple.com/us/app/truemoney-wallet/id663885752?mt=8",
          "https://play.google.com/store/apps/details?id=th.co.truemoney.wallet&hl=th"
        );
        break;
      case "18":
        window.location.href = " https://www.koraenterprise.com/";
        break;
      default :
        this.alert_msg("ขออภัยไม่สามารถใช้งาน funtion นี้ได้เนืองจากยังไม่เปิดบริการ"); 
        break; 
    }
  }

  get_point() {
    this.Apidcp.get_point(this.user_id).then(data => {
      if (data == null) {
        this.point = 0;
      } else {
        this.point = data[0].user_new_coin;
      }
    });
  }

  tbd() {
    this.app.getRootNav().push(AppBankPage);
  }

  scan() {
    this.User_data.then(result => {
      this.barcodeScanner.scan().then(
        barcodeData => {
          this.scannedCode = barcodeData.text;
          this.get_discount(this.scannedCode);
        },
        err => {
          console.log("Error: ", err);
        }
      );
    });
  }

  hb_wallet() {
    this.launchExternalApp(
      "https://itunes.apple.com/th/app/hb-wallet/id1273639572?l=th&mt=8",
      "https://play.google.com/store/apps/details?id=co.bacoor.android.hbwallet&hl=th"
    );
  }

  get_discount(scanercode_id) {
    this.apiServe.check_qrcode_payment(scanercode_id).then(data => {
      var act = data["act"];
      var msg = data["msg"];
      this.show_success_qrcode(act, msg, scanercode_id);
    });
  }

  show_success_qrcode(act, msg, scanercode_id) {
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

  alert_msg(msg) {
    let alert = this.alertCtrl.create({
      title: "เกิดข้อผิดพลาด!",
      subTitle: msg,
      buttons: ["OK"]
    });
    alert.present();
  }

  withdraw() {
    this.app.getRootNav().push(WithdrawPage);
  }
}
