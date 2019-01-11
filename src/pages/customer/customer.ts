import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams , LoadingController , ModalController} from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
//import { NgForm } from '@angular/forms/src/directives/ng_form';

import {FiltersPage} from '../filters/filters';
//import {PlaceDetailPage} from '../place-detail/place-detail';
import {SearchPage} from '../search/search';
import { CustomerDetailPage } from '../customer-detail/customer-detail';
import { ApiCategoryProvider } from './../../providers/api-category/api-category';
/**
 * Generated class for the CustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage {

  group_id : any;
  city_id : any;
  category_id : any;
  customerList : any;
  group_name : any;
  pic_head : any;
  pic_title :any;
  discout : any;

  constructor(public apiCategory : ApiCategoryProvider,public navCtrl: NavController, public navParams: NavParams , public apiServe : ApiProvider, public loaddingCtrl : LoadingController,public modalCtrl: ModalController,public app:App) {
    /*let loading = this.loaddingCtrl.create({
      content: "loading...",
      spinner:"dots"
    })*/
    this.get_customer()
  }

  get_customer(){
    this.group_id = this.navParams.get('group_id');
    this.city_id = this.navParams.get('city_id');
    this.category_id = this.navParams.get('category_id');
 
    this.apiCategory.load_customer_list_new(this.group_id, this.city_id, this.category_id).then((data) => {
      this.customerList =  data; 
      
    

      for(var p=0; p < this.customerList.length ; p++){
        if(this.customerList[p]['customer_detail'] == ""){
          this.customerList[p]['customer_detail'] = "ไม่พบข้อมูล";
        }
        if(this.customerList[p]['customer_telephone'] == ""){
          this.customerList[p]['customer_telephone'] = "ไม่พบข้อมูล";
        }
        if(this.customerList[p]['work_day_stop'] == ""){
          this.customerList[p]['work_day_stop'] = "ไม่พบข้อมูล";
        }
        if(this.customerList[p]['vote_sum'] == null){
          this.customerList[p]['vote_sum'] = "0";
        }
        
      }
    })
    
    
  }

   // show filters
   showFilters() {
    let filterModal = this.modalCtrl.create(FiltersPage);
    filterModal.present();
  }

  goToSearch() {
    this.app.getRootNav().push(SearchPage);
  }

  viewCustomerHomepage(customer_id){
    this.loaddingCtrl.create({
      content: 'Please wait...',
      duration: 3000,
      dismissOnPageChange: true
    }).present();
    setTimeout(() => {
      this.navCtrl.push(CustomerDetailPage, {customer_id: customer_id});
  }, 1000);
    
  }

  /*get_pic(data){
    var picArr = [];
    for(var i=0; i <  data.length; i++){
        for(var p=0; p < data[i].img_part_head.length ; p++){
            picArr.push(data[i].img_part_head[p]);
        }
      var pic_head = [];
   
    }
    
   
  }*/

}
