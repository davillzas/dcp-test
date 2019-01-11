import {Component} from '@angular/core';
import {NavController , NavParams} from 'ionic-angular';
import {PlaceService} from '../../services/place-service';

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  public place: any;
  public customer_detail : any;

  constructor(public nav: NavController, public placeService: PlaceService, public navParams: NavParams) {
    // get first place for example
    //this.place = placeService.getItem(1);
    this.get_customer_menu();
  }

  get_customer_menu(){
    this.customer_detail = this.navParams.get('menu_customer');
    //console.log(this.customer_detail);
  }
}
