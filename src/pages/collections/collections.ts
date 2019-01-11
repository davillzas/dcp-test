import { LocationHomePage } from './../location-home/location-home';
import {Component} from '@angular/core';
import {App, NavController , NavParams, AlertController} from 'ionic-angular';
import {CollectionService} from '../../services/collection-service';
import { ApiProvider } from './../../providers/api/api';
import { CustomerPage } from './../customer/customer';
import {PlacesPage} from '../places/places';
import { ApiCategoryProvider } from './../../providers/api-category/api-category';

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-collections',
  templateUrl: 'collections.html'
})
export class CollectionsPage {
  public collections: any;
  category_name : any;
  category_id : any;
  groupList : any;
  value_city : any;
  city_name : any;
  city_id : any;
  location_map : any;

  constructor(public navParams : NavParams,
    public nav: NavController, 
    public collectionService: CollectionService, 
    public app:App,public apiServe : ApiProvider, 
    public apiCategory : ApiCategoryProvider,
    public alertCtrl : AlertController
    ) {
    // set sample data
    this.collections = collectionService.getAll();
   
    this.city_name = null;
    this.city_id = this.navParams.get('city_id');
    //console.log(this.city_id)
    if(this.city_id != null){
      this.load_data_city(this.city_id)      
    }else{
      this.load_city()
    }
  }
  
  load_data_city(city_id){
    
    this.apiServe.get_city()
    .subscribe((data) => {
      this.value_city =  data;
      this.show_city_id(city_id)
    })
  }

  load_city(){
    this.apiServe.get_city()
   .subscribe((data) => {
     this.value_city =  data;
   })
 }

  show_city_id(selectedValue: any) {
     
      for(var i=0; i <  this.value_city.length; i++){
        if(selectedValue == this.value_city[i].city_id)  {
          this.city_name = this.value_city[i].city_name;
          this.city_id = this.value_city[i].city_id;
          this.location_map = this.value_city[i].location_map;
          this.get_groupList(selectedValue);
        }
      }
    
      
   
  }

  get_groupList(value_city){
    
    this.category_id = this.navParams.get('category_id')
    this.category_name = this.navParams.get('category_name')
    
    
    this.apiCategory.load_groupListServ_new_edit_1(this.category_id,value_city).then((data) => {
    
      if(data == null){
        this.groupList = [];
        this.groupList['0'] = ({'data_group' :{'group_id' : 0, 'group_name' : 'ไม่พบข้อมูล','group_img' : ''} ,'data_sum_group' : {'sum_group' : '0'}});
        
      }else{
        this.groupList = data;
        
       
        
      }
   
    })
    
  }

  // add bookmark
  addBookMark(collection) {
    collection.bookmarked = !collection.bookmarked;
  }

  // view a collection
  goToCollection(id) {
    if(id == 0){
      this.alert_msg("ไม่สามารถเข้าใช้งานได้เนื่องจากไม่มีข้อมูลร้านค้า ในจังหวัดนี้");
    }else{
      this.app.getRootNav().push(PlacesPage);
    }
    
  }

  viewCustomer(group_id){
    if(group_id == 0){
      this.alert_msg("ไม่สามารถเข้าใช้งานได้เนื่องจากไม่มีข้อมูลร้านค้า ในจังหวัดนี้");
    }else{
      this.nav.push(CustomerPage , {group_id : group_id,city_id : this.city_id,category_id : this.category_id});
  }
    }
    

  goTo_location_home(){
    
    
    var group_id = [];
    for(var i=0; i < this.groupList.length ; i++){
      group_id.push(this.groupList[i]['data_group']['group_id']);
    }

    if(group_id[0] == 0){
      this.alert_msg("ไม่สามารถเข้าใช้งานได้เนื่องจากไม่มีข้อมูลร้านค้า ในจังหวัดนี้");
    }else{
      this.app.getRootNav().push(LocationHomePage, {city_id : this.city_id ,city_name : this.city_name, location_map : this.location_map, catagory_id : this.category_id,group_id : group_id});
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
}
