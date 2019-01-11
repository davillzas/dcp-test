import { CustomerDetailPage } from './../customer-detail/customer-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
import { ApiProvider } from './../../providers/api/api';
declare var google: any;
import { UserService } from '../../services/user-service';
/**
 * Generated class for the LocationHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-location-home',
  templateUrl: 'location-home.html',
})
export class LocationHomePage {
  city_id : any;
  city_name : any;
  catagory_id : any;
  group_id : any;
  location_map : any;
  center_location : any;
  data_location_customer : any;
  customer_location : any;
  options : GeolocationOptions;
  currentPos : Geoposition;
  public map: any;
  position : any;
  value_geolocation : any;
  infoWindow : any;
  geocoder : any;
  constructor(public navCtrl: NavController, public navParams: NavParams , public apiServe : ApiProvider,public geolocation : Geolocation, public UserService: UserService, public app:App) {
    
 
  }

  ionViewDidLoad() {
    this.get_location_customer_city();
  }

  get_location_customer_city(){
    this.city_id = this.navParams.get('city_id');
    this.city_name = this.navParams.get('city_name');
    this.location_map = this.navParams.get('location_map');
    this.catagory_id = this.navParams.get('catagory_id');
    this.group_id = this.navParams.get('group_id');
    

   
    this.apiServe.load_customer_location_home(this.city_id,this.location_map)
        .then((data) => {

         
          this.center_location = this.location_map;
          this.customer_location = data[0].customer_location;
          

          var cut_location_city = this.center_location.split(",");
          var cut_location = [];
          cut_location['lat'] = cut_location_city[0];
          cut_location['lng'] = cut_location_city[1];

          this.initializeMap(cut_location,this.customer_location);
    })
  }

  initializeMap(cut_location,customer_location){    
    var minZoomLevel = 5;
    
    var lat = parseFloat(cut_location['lat']);
    var lng = parseFloat(cut_location['lng']);
    
    

    this.map = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: minZoomLevel,
      center: new google.maps.LatLng( lat, lng),
      mapTypeId: google.maps.MapTypeId.ROADMAP
      
    });
    
    this.view_map_user(this.city_id,this.catagory_id,this.group_id);

  }

  view_map_user(city_id,catagory_id,group_id){
    
    /*for (var i=0; i < customer_location.length ; i++){ 
      this.geocoder = new google.maps.Geocoder();   
  
      this.get_map_customer(customer_location[i])
    }*/
    this.apiServe.load_map_customer(city_id,catagory_id,group_id)
    .then((data) => {
      this.data_location_customer = data;
      for (var i=0; i < this.data_location_customer.length ; i++){ 
        //console.log(this.data_location_customer[i]);
        //console.log(this.data_location_customer[i]['data']);
        for (var x=0; x < this.data_location_customer[i]['data'].length ; x++){ 
           for (var p=0; p < this.data_location_customer[i]['data'][x]['data_location_customer'].length; p++){
            console.log(this.data_location_customer[i]['data'][x]['data_location_customer'][p]);
            this.get_map_customer(this.data_location_customer[i]['data'][x]['data_location_customer'][p])
           }
        }
      }
    })

  }

  get_map_customer(customer_location){
    
    
     //console.log(customer_location.location_map)
     var img = "http://customer.discountpercent.com/img/icon-02.png";
     var cut_location_customer = customer_location.location_map.split(",");
     if(cut_location_customer == ""){

     }else{
      var cut_customer_location = [];
      cut_customer_location['name'] = customer_location.customer_name
      cut_customer_location['lat'] = parseFloat(cut_location_customer[0]);
      cut_customer_location['lng'] = parseFloat(cut_location_customer[1]);
      
   
      var myLatLng_customer = {lat: cut_customer_location['lat'], lng: cut_customer_location['lng']};
      
      var marker_customer = new google.maps.Marker({
        position: new google.maps.LatLng(cut_customer_location['lat'],cut_customer_location['lng']),
        map: this.map,
        title: cut_customer_location['name'],
        icon: img
      });
 
      var content = document.createElement('div');
      content.textContent = customer_location.customer_name + ' ';
      var zoomInButton = document.createElement('button');
      zoomInButton.textContent = 'ไปที่ร้าน';
      content.appendChild(zoomInButton);
      var button_value = customer_location
 
      this.infoWindow = new google.maps.InfoWindow({content: content});
      this.infoWindow.open(marker_customer, marker_customer);
 
      zoomInButton.addEventListener("click", (e:Event) => this.gotopage_customer(customer_location.customer_id))
      /*zoomInButton.onclick = function(){
 
      }*/
     }
    
     
          
  }

  gotopage_customer(customer_id){
    this.app.getRootNav().push(CustomerDetailPage, {customer_id: customer_id});
  }

}

  


