//import { HomePage } from './../home/home';
import { MainTabsPage } from './../main-tabs/main-tabs';
import { ApiProvider } from './../../providers/api/api';
import {Component} from '@angular/core';
import {App,NavController , LoadingController} from 'ionic-angular';
import { UserService } from '../../services/user-service';
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-select-location',
  templateUrl: 'select-location.html'
})
export class SelectLocationPage {
  cityList : any;
  
  constructor(
    public nav:NavController,
    public apiServe : ApiProvider,
    public loaddingCtrl : LoadingController,
    public app:App,
    public UserService: UserService
  ) {
      this.get_City();
      
    }

    
    get_City(){
      this.apiServe.load_city()
      .subscribe((data) => {
        this.cityList =  data;  
      })
    }
        
    click_valCity(value_city){
      this.remove_storage_city();
      this.UserService.Get_city(value_city);
      this.Go_to_page();
    }

    remove_storage_city(){
      this.UserService.clear_city_data();
    }

    Go_to_page(){
      this.nav.push(MainTabsPage)
    }

    
}
