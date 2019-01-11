import { MainTabsPage } from './../main-tabs/main-tabs';
import {Component} from '@angular/core';
import {IonicPage,App, NavController,NavParams,LoadingController , AlertController} from 'ionic-angular';
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

/**
 * Generated class for the StreamingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-streaming',
  templateUrl: 'streaming.html',
})
export class StreamingPage {
  User_data : any;
  constructor(public nav:NavController, public placeService:PlaceService
    , public app:App
    , public navParams: NavParams
    , public apiServe : ApiProvider
    , public barcodeScanner: BarcodeScanner
    , public http : Http
    , public loaddingCtrl : LoadingController
    , public alertCtrl: AlertController
    , public UserService: UserService
    , public storage : Storage
    , public apiCategory : ApiCategoryProvider) {
  }

  refresh_user(){

    let loading = this.loaddingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...'
    });
  
    loading.present();

    this.User_data = this.UserService.User_data()
    this.User_data.then(result =>{
                                   var user_id = result[0].user_id;

                                   /*this.apiServe.refresh_users(user_id)
        .then((data) => {
          var user_data = data;
          var remove_user_data = this.UserService.clear_user_data();
          if(remove_user_data == '1'){
            setTimeout(() => {
              var get_user_data = this.UserService.Get_data(user_data);
              if(get_user_data == '1'){
                setTimeout(() => {
                  this.nav.push(MainTabsPage);
                }, 1000);

                setTimeout(() => {
                  loading.dismiss();
                }, 2000);
              }
            }, 1000);
          }
          /*var remove_user_data = this.UserService.remove_user_data();
          if(remove_user_data == '1'){
            this.nav.push(MainTabsPage);
            setTimeout(() => {
              loading.dismiss();
            }, 3000);
          }*/
                                   /*var remove_user_data = this.UserService.remove_user_data();
          if(remove_user_data == '1'){
            var get_user_data = this.UserService.Get_data(data);
            if(get_user_data == '1'){

              setTimeout(() => {
                this.nav.push(MainTabsPage);
              }, 1000);

              setTimeout(() => {
                loading.dismiss();
              }, 5000);
            }
          }
      })*/
    })
  }

}
