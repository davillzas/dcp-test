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
export class ApiCategoryProvider {

  constructor(public http: Http) {
    
  }

  load_category(){
    /*return new Promise ((resolve, reject) => {
     
      this.http.post(url + type , string
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })
    })*/
    let type = "get_category_new"
    return  this.http.get(url + type) 
    .map((res) => res.json());
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

  load_groupListServ_new(category_id,city_id){
   
    return new Promise ((resolve, reject) => {
      let type = "get_groupList_new"
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

  
  load_groupListServ_new_edit_1(category_id,city_id){
   
    return new Promise ((resolve, reject) => {
      let type = "get_groupList_new_1"
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
  

  load_customer_list_new(group_id,city_id,category_id){
   
    return new Promise ((resolve, reject) => {
      let type = "get_customer"
      var obj = { "group_id" : group_id,"city_id" : city_id, "category_id"  : category_id}
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
