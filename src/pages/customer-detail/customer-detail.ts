import { MenuPage } from './../menu/menu';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController} from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { CustomerPicPage } from './../customer-pic/customer-pic';
/**
 * Generated class for the CustomerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-detail',
  templateUrl: 'customer-detail.html',
})
export class CustomerDetailPage {

  cutomer_id : any;
  data_customer_id : any;
  customer_detail : any;
  val : any;
  customer_name : any;
  status_work : any;
  pic_title : any;
  customer_parking : any;
  custoemr_pic : any;
  customer_menu :any;
  catagory_title :any;
  public work_open:any;
  public work_close:any;
  public day_open:any;
  public day_close:any;
  public work_time_open:any;
  public work_time_close:any;
  customer_location : any;
  get_link_google : any;
  cut_location : any;
  link_google : any;
  customer_facebook : any;
  customer_telephone : any;
  pic_all_customer : any;
  open_customer_24 : any;
  time_open_24 : any;
  discout : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loaddingCtrl : LoadingController, public apiServe : ApiProvider) {
      this.get_customer_detail()
      
    // get working hours
    
  }

  get_customer_detail(){
    this.cutomer_id = this.navParams.get('customer_id');
      this.apiServe.get_customer_detail_new(this.cutomer_id).then((data) => {
          this.data_customer_id = data[0].customer_id
          this.customer_detail = data
          this.work_time_open = data[0].work_time_open
          this.work_time_close = data[0].work_time_close
          this.day_open = data[0].work_day_open_val
          this.day_close = data[0].work_day_stop_val
          this.customer_name = data[0].customer_name
          this.customer_parking = data[0].customer_parking
          this.custoemr_pic = data[0].pic_head
          this.customer_menu = data[0].menu_customer
          this.customer_location = data[0].customer_location
          this.customer_facebook = data[0].customer_page_facebook
          this.customer_telephone = data[0].customer_phone
          this.pic_all_customer = data[0].get_pic_customer
         
          if(this.customer_facebook == ""){
            this.customer_facebook = false;
          }

          if (this.customer_parking == 0){
            this.customer_parking = "ไม่มีที่จอดรถ"
          }else{
            this.customer_parking = "มีที่จอดรถ"
          }
        
        
        this.status_work = this.getWorkingHours(this.work_time_open,this.work_time_close,this.day_open,this.day_close);
        this.pic_title = this.get_pic(this.custoemr_pic);
        

        this.get_link_google = this.cut_location_google(this.customer_location); 
      })
  }

  getWorkingHours(work_time_open,work_time_close,day_open,day_close){
   
    var work_open = work_time_open.split(":");
    var work_close = work_time_close.split(":");

    
    work_open = parseInt(work_open[0]) * 60 + parseInt(work_open[1]);
    work_close = parseInt(work_close[0]) * 60 + parseInt(work_close[1]);
    

    var d = new Date(); 
   


    var hours = (d.getHours()<10?'0':'') + d.getHours();
    var minut = (d.getMinutes()<10?'0':'') + d.getMinutes();

    var time =  hours + ':' + minut;
    var cutString_time =  time.split(":");
   
    
    var time_value = parseInt(cutString_time[0]) * 60 + parseInt(cutString_time[1]);
   
  

    var day = d.getDay();
    
    
    var work_time_value = day_open.split(",");
    var tmpArr = [];

    for(var i=0; i < work_time_value.length ; i++){
      tmpArr.push(work_time_value[i]);
      if(i == 6){
        this.open_customer_24 = true;
      }else{
        this.open_customer_24 = false;
      }
    }
    

    for( i = 0 ; i < tmpArr.length ; i++){
      if(tmpArr[i] == day){
          var work = true;
      }
    }

    if(work == undefined){
      work = false;
    }

    
    if(work == true){
      //console.log(time_value + ' ' + work_open + ' '  + work_close  );
      if (time_value > work_open && time_value < work_close ) { 
        return true;
      }else if(work_open == work_close){
        this.time_open_24 = true;
        return true;
      }else if(work_close == 0){
        if(time_value < work_open){
          return false;
        }else{
          return true;
        }
      }
    }else{
      return false
    }
  }

  cut_location_google(customer_location){
    var cut_location_city = customer_location.split(",");
    this.cut_location = [];
    this.cut_location['lat'] = cut_location_city[0];
    this.cut_location['lng'] = cut_location_city[1];

    this.link_google = 'https://www.google.com/maps/search/?api=1&query='+ this.cut_location['lat'] + ',' +  this.cut_location['lng'];
    //console.log(this.link_google)
  }

  get_pic(custoemr_pic){
    
    var picArr = [];
    for(var i=1; i <  4; i++){
      picArr.push(custoemr_pic['pic'+i]);
      //console.log(custoemr_pic['pic'+i])
    }
   //console.log(picArr)
   return picArr
  }

  get_menu_customer(customer_menu){
    
    var menuArr = [];
    if(customer_menu[0].catagory == "ไม่พบข้อมูล"){
     
    }else{
      for(var i=0; i < 1; i++){
        menuArr.push(customer_menu[i]);
      }
    }

    return menuArr;
  }

  goToPhotos_customer(){
    //Object.keys(obj).length
    var picArr = [];
    for(var i=1; i <=  Object.keys(this.pic_all_customer).length; i++){
      picArr.push(this.pic_all_customer['pic'+i]);
    }
    //console.log(this.custoemr_pic)
     this.navCtrl.push(CustomerPicPage ,{customer_pic_detail : picArr});

    
  }

  goToMenu(){
    var menuArr = [];
    //console.log( Object.keys(this.customer_menu).length)
    for(var i=0; i <  Object.keys(this.customer_menu).length; i++){
      menuArr.push(this.customer_menu[i]);
    }
    
    this.navCtrl.push(MenuPage ,{menu_customer : menuArr})
  }

  

}
