import {Injectable} from "@angular/core";
//import {COLLECTIONS} from "./mock-collections";
import { Storage } from '@ionic/storage';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';

@Injectable()
export class UserService {
    //private data_user:any;
    position : any;
    constructor(public Storage : Storage ,public geolocation : Geolocation) {
      
    }

    Get_data(data) {
        return this.Storage.set('data_user', data);
        //console.log(this.data_user);

    }

    set_data_login(login_code){
        this.Storage.set('login_code', login_code);
    }


    User_data(){
        //console.log(this.data_user)
        return this.Storage.get('data_user');
        
    }

    remove_user_data(){
        this.Storage.remove('data_user');
        return '1';
    }

    clear_user_data(){
        this.Storage.clear();
        return '1';
    }

    Get_city(data){
        this.Storage.set('data_city', data);
    }

    city_data(){
        return new Promise ((resolve, reject) => {
            this.Storage.get('data_city').then((data) =>{
                resolve(data)
            })
        })
        //return this.Storage.get('data_city');
    }   

    clear_city_data(){
        this.Storage.remove('data_city');
    }

    getUserPosition(){
        return this.geolocation.getCurrentPosition().then((res) => {
          
         return this.position = {
            lat: res.coords.latitude,
            lng: res.coords.longitude
          }
       });
    }

  
}