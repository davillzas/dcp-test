import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the ApiCategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let url = "https://customer.discountpercent.com/Api_category/"
@Injectable()
export class ApiCategory2Provider {

  constructor(public http: Http) {
    
  }

  load_category(city_id){
    return new Promise ((resolve, reject) => {
      let type = "get_category_new"
      this.http.post(url + type, JSON.stringify(city_id))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })
    })
  }

  load_groupListServ(category_id,city_id){
   
    return new Promise ((resolve, reject) => {
      let type = "get_groupList"
      var obj = { "city_id" : city_id, "category_id"  : category_id}
      this.http.post(url + type, JSON.stringify(obj))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })
    })
  }
}
