import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let url = "https://customer.discountpercent.com/api/";
let url_2 = "https://customer.discountpercent.com/api_update_1/";
let url_3 = "https://customer.discountpercent.com/wallet/";
let url_4 = "https://customer.discountpercent.com/api_2c2p/";
let url_5 = "https://customer.discountpercent.com/topup_mobile/";

//let url_localhost = "http://localhost/discountpersent/index.php/api/"
@Injectable()
export class ApiProvider {

  constructor(public http: Http) {
    //console.log('Hello ApiProvider Provider');
  }

  load_city(){
    return  this.http.get("https://customer.discountpercent.com/api") 
       .map((res) => res.json());
  }

  get_icon_h2h(){
    return  this.http.get("https://customer.discountpercent.com/api_update_1/get_icon_h2h") 
       .map((res) => res.json());
  }

  load_service(city_id){
    return new Promise ((resolve, reject) => {
      this.http.post("https://customer.discountpercent.com/api/get_category", JSON.stringify(city_id))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })
   })
  }

  load_groupListServ(category_id){
   
    return new Promise ((resolve, reject) => {
      let type = "get_groupList"

      this.http.post(url + type, JSON.stringify(category_id))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })
    })
  }
  

  load_customer_list(group_id){
    return new Promise ((resolve, reject) => {
      let type = "get_customer"

      this.http.post(url + type, JSON.stringify(group_id))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })
    })
  }

  load_customer_detail(customer_id){
    return new Promise ((resolve, reject) => {
      let type = "get_customer_detail"

      this.http.post(url + type, JSON.stringify(customer_id))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })
    })
  }

  get_customer_detail_new(customer_id){
    return new Promise ((resolve, reject) => {
      let type = "get_customer_detail_new"

      this.http.post(url + type, JSON.stringify(customer_id))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })
    })
  }

  load_customer_location_home(city_id,location_code){
    return new Promise ((resolve, reject) => {
      let type = "get_customer_location_home"
      //console.log(city_id,location_code)
      var obj = {"city_id" : city_id , "location_code" : location_code};
      this.http.post(url + type, JSON.stringify(obj))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error)
      })

      //console.log(url_localhost+type)
    })
  }

  save_signUp(name,phone,password,phofile){
    return new Promise ((resolve, reject) => {
        let type = "save_signUp"
        var obj = {"name" : name,"phone" : phone,"password" : password , "phofile" : phofile}
        this.http.post(url + type, JSON.stringify(obj))
        .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  /*check_login(username,password){
    return new Promise ((resolve, reject) => {
      let type = "check_login"
      var obj = { "username" : username , "password" : password}
      this.http.post(url + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }*/

  check_login(phone,password){
    return new Promise ((resolve, reject) => {
      let type = "check_login"
      var obj = {"phone" : phone,"password" : password}
      this.http.post(url + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  

  insert_login_code(login_code){
    return new Promise ((resolve, reject) => {
      let type = "insert_login"
      var obj = { "login_code" : login_code}
      this.http.post(url + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  check_qr_code_customer(scanercode_id){
    return new Promise ((resolve, reject) => {
      let type = "check_qr_code"
      //var obj = { "qr_code_id" : scanner_id}
 
      this.http.post(url + type, JSON.stringify(scanercode_id))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  check_scanercode(scanner_id){
    return new Promise ((resolve, reject) => {
      let type = "get_scanner"
      //var obj = { "qr_code_id" : scanner_id}
 
      this.http.post(url + type, JSON.stringify(scanner_id))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  load_data_qrcode(data){
    return new Promise ((resolve, reject) => {
      let type = "get_scanner"

      this.http.post(url + type, JSON.stringify(data))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })   
    })
  }

  insert_user_discount(qr_code_id,user_id,customer_id,total_discount,qr_code_discount,user_discount_value,qr_code_active,discount_status){
    return new Promise ((resolve, reject) => {
      let type = "insert_user_discount"
      var obj = { "customer_id" : customer_id , "user_id" : user_id 
      , "qr_code_id" : qr_code_id , "user_discount_value" : user_discount_value
      , "qr_code_discount" : qr_code_discount , "total_discount" : total_discount
      , "qr_code_active" : qr_code_active , "user_discount_status" : discount_status
      }
      this.http.post(url + type, JSON.stringify(obj))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })  
    })
  }

  load_data_discount(user_id){
    return new Promise ((resolve, reject) => {
      let type = "get_data_user_discount"
      this.http.post(url + type, JSON.stringify(user_id))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })  
    })
  }

  load_data_discount_cancle(user_id){
    return new Promise ((resolve, reject) => {
      let type = "get_data_user_discount_cancle"
      this.http.post(url + type, JSON.stringify(user_id))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })  
    })
  }

  load_total_discount(user_discount_code){
    return new Promise ((resolve, reject) => {
      let type = "get_data_user_discount_total"
      this.http.post(url + type, JSON.stringify(user_discount_code))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })  
    })
  }

  edit_user_discount(user_discount_code){
    return new Promise ((resolve, reject) => {
      let type = "edit_user_discount"
      this.http.post(url + type, JSON.stringify(user_discount_code))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })  
    })
  }

  cancle_user_discount(user_discount_code){
    return new Promise ((resolve, reject) => {
      let type = "cancle_user_discount"
      this.http.post(url + type, JSON.stringify(user_discount_code))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })  
    })
  }

  save_user_payment(user_id,user_name,user_date,user_time,user_monney,advisor_code){
    return new Promise ((resolve, reject) => {
      let type = "save_user_payment"
      var obj = { 
          "user_id" : user_id,
          "user_name" : user_name,
          "user_date" : user_date,
          "user_time" : user_time,
          "user_monney" : user_monney,
          "advisor_code" : advisor_code
      }
      this.http.post(url + type, JSON.stringify(obj))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })  
    })
  }

  upload_img(packData){
    return new Promise ((resolve, reject) => {
      let type = "upload_user_payment_img"
      this.http.post(url + type, JSON.stringify(packData))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })  
    })
  }

  load_user_payment(user_id){
    return new Promise ((resolve, reject) => {
      let type = "load_user_payment"
      this.http.post(url + type, JSON.stringify(user_id))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })  
    })
  }

  refresh_users(user_id){
    return new Promise ((resolve, reject) => {
      let type = "refresh_user"
      this.http.post(url + type, JSON.stringify(user_id))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })  
    })
  }

  check_advisor_code(advisor_code){
    return new Promise ((resolve, reject) => {
      let type = "check_sale_code"
      this.http.post(url + type, JSON.stringify(advisor_code))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })  
    })
  }

  insert_user_discount_bank(qr_code_id,user_id,customer_id,total_discount,qr_code_discount,user_discount_value,qr_code_active,discount_status,bank_name){
    return new Promise ((resolve, reject) => {
      let type = "insert_user_discount_bank"
      var obj = { "customer_id" : customer_id , "user_id" : user_id 
      , "qr_code_id" : qr_code_id , "user_discount_value" : user_discount_value
      , "qr_code_discount" : qr_code_discount , "total_discount" : total_discount
      , "qr_code_active" : qr_code_active
      , "user_discount_status" : discount_status
      , "user_discount_bank_name" : bank_name
      }
      this.http.post(url + type, JSON.stringify(obj))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })  
    })
  }

  load_map_customer(city_id,catagory_id,group_id){
    return new Promise ((resolve, reject) => {
      let type = "load_map_customer";
      var obj = {"city_id" : city_id , "catagory_id" : catagory_id,"group_id" : group_id };
      this.http.post(url + type, JSON.stringify(obj))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })  
    })
  }

  check_user_web(user_phone){
    return new Promise ((resolve, reject) => {
      let type = "check_user_web";
      var obj = {"phone" : user_phone };
      this.http.post(url + type, JSON.stringify(obj))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })  
    })
  }

  check_user(user_phone,password){
    return new Promise ((resolve, reject) => {
      let type = "check_user";
      var obj = {"phone" : user_phone  , "password" : password};
      this.http.post(url + type, JSON.stringify(obj))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })  
    })
  }

  check_uuid(phone,uuid){
    return new Promise ((resolve, reject) => {
      let type = "check_uuid";
      var obj = {"phone" : phone, "uuid" : uuid};
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
      .subscribe(data =>{
        resolve(data);
      },error =>{
        reject(error);
      })  
    })
  }

  get_data_to_login(phone){
    return new Promise ((resolve, reject) => {
      let type = "get_data_to_login"
      var obj = {"phone" : phone}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }
  

  insert_user(phone,uuid,phone_advisor_data){
    return new Promise ((resolve, reject) => {
      let type = "insert_user"
      var obj = {"phone" : phone, "uuid" : uuid,"phone_advisor_data" : phone_advisor_data}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  get_city(){
    return  this.http.get("https://customer.discountpercent.com/api_update_1/get_city") 
       .map((res) => res.json());
  }

  load_icon(){
    return  this.http.get("https://customer.discountpercent.com/api_update_1/get_icon") 
    .map((res) => res.json());
  }


  edit_logout(login_id){
    return new Promise ((resolve, reject) => {
      let type = "edit_logout"
      var obj = {"login_id" : login_id}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  check_login_uuid(uuid){
    return new Promise ((resolve, reject) => {
      let type = "check_login_uuid"
      var obj = {"uuid" : uuid}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  get_user(phone,uuid){
    return new Promise ((resolve, reject) => {
      let type = "get_user"
      var obj = {"phone" : phone , "uuid" : uuid}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  get_phone(uuid){
    return new Promise ((resolve, reject) => {
      let type = "get_phone"
      var obj = { "uuid" : uuid}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  insert_deposit_user(user_date,user_time,user_monney,phone){
    return new Promise ((resolve, reject) => {
      let type = "insert_deposit_user"
      var obj = { "user_date" : user_date, "user_time" : user_time, "user_monney" : user_monney, "phone" : phone }
      this.http.post(url_3 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  check_pin(phone){
    return new Promise ((resolve, reject) => {
      let type = "check_pin"
      var obj = { "phone" : phone }
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  insert_pin_user(pin,phone){
    return new Promise ((resolve, reject) => {
      let type = "insert_pin_user"
      var obj = { "pin" : pin,"phone" : phone }
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  check_pin_to_insert_transfer(phone,pin_wallet){
    return new Promise ((resolve, reject) => {
      let type = "check_pin_to_insert_transfer"
      var obj = { "pin_wallet" : pin_wallet,"phone" : phone }
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  check_wallet_user(user_id){
    return new Promise ((resolve, reject) => {
      let type = "check_wallet_user"
      var obj = { "user_id" : user_id }
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  insert_transfer_user(wallet_user,wallet_customer,discount,cut_persent,deduction,value_target,sum_dues_marketing,sum_dues_team_promote,sum_dues_promotion,sum_dues_deduction,phone,customer_id,qr_code_id){
    return new Promise ((resolve, reject) => {
      let type = "insert_wallet_tranfer"
      var obj = { "wallet_user" : wallet_user , "wallet_customer" : wallet_customer ,"discount" : discount , "cut_persent" : cut_persent , "deduction" : deduction , "value_target" : value_target , "sum_dues_marketing" : sum_dues_marketing , "sum_dues_team_promote" : sum_dues_team_promote , "sum_dues_promotion" : sum_dues_promotion , "sum_dues_deduction" : sum_dues_deduction , "phone" : phone , "customer_id" : customer_id , "qr_code_id" : qr_code_id }
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  insert_transfer_user_no_dues(wallet_user,wallet_customer,discount,value_target,phone,customer_id,qr_code_id){
    return new Promise ((resolve, reject) => {
      let type = "insert_transfer_user_no_dues"
      var obj = { "wallet_user" : wallet_user , "wallet_customer" : wallet_customer , "discount" : discount  , "value_target" : value_target , "phone" : phone , "customer_id" : customer_id , "qr_code_id" : qr_code_id }
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  deposit_status_1(phone){
    return new Promise ((resolve, reject) => {
      let type = "deposit_status_1"
      var obj = { "phone" : phone}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  deposit_status_2(phone){
    return new Promise ((resolve, reject) => {
      let type = "deposit_status_2"
      var obj = { "phone" : phone}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  get_data_tranfer(user_id){
    return new Promise ((resolve, reject) => {
      let type = "get_data_tranfer"
      var obj = { "user_id" : user_id}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  get_data_receive(user_id){
    return new Promise ((resolve, reject) => {
      let type = "get_data_receive"
      var obj = { "user_id" : user_id}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  get_dues(){
    
    return  this.http.get("https://customer.discountpercent.com/api_update_1/get_dues") 
       .map((res) => res.json());
  }


  get_tranfer_detail(tranfer_id){
    return new Promise ((resolve, reject) => {
      let type = "get_tranfer_detail"
      var obj = { "tranfer_id" : tranfer_id}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  insert_withdown_bank(bank,bank_number,bank_name,money,user_id){
    return new Promise ((resolve, reject) => {
      let type = "insert_withdown_bank"
      var obj = { "bank" : bank, "bank_number" : bank_number, "bank_name" : bank_name , "money" : money , "user_id" : user_id}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  insert_withdown_bank_payment(bank_withdown_prompay,bank_number_prompay,bank_name_withdown_prompay,money_withdown_prompay,user_id){
    return new Promise ((resolve, reject) => {
      let type = "insert_withdown_bank_payment"
      var obj = { "bank_withdown_prompay" : bank_withdown_prompay, "bank_number_prompay" : bank_number_prompay, "bank_name_withdown_prompay" : bank_name_withdown_prompay , "money_withdown_prompay" : money_withdown_prompay, "user_id" : user_id}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  get_bank_account(user_id){
    return new Promise ((resolve, reject) => {
      let type = "get_bank_account"
      var obj = { "user_id" : user_id}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  get_data_bank_number(bank_number_check){
    return new Promise ((resolve, reject) => {
      let type = "get_data_bank_number"
      var obj = { "bank_number_check" : bank_number_check}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  withdraw_detail_status_1(user_id){
    return new Promise ((resolve, reject) => {
      let type = "withdraw_detail_status_1"
      var obj = { "user_id" : user_id}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  withdraw_detail_status_2(user_id){
    return new Promise ((resolve, reject) => {
      let type = "withdraw_detail_status_2"
      var obj = { "user_id" : user_id}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  get_data_maketing(user_id){
    return new Promise ((resolve, reject) => {
      let type = "get_data_maketing"
      var obj = { "user_id" : user_id}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  get_data_profile(user_id){
    return new Promise ((resolve, reject) => {
      let type = "get_data_profile"
      var obj = { "user_id" : user_id}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  insert_payment(qr_code_id,user_id,customer_id,qr_code_discount,user_discount_value,msg){
    return new Promise ((resolve, reject) => {
      let type = "insert_payment_data"
      var obj = { "user_id" : user_id , "qr_code_id" : qr_code_id , "customer_id" : customer_id , "qr_code_discount" : qr_code_discount, "user_discount_value" : user_discount_value, "msg" : msg}
      this.http.post(url_4 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  load_data_payment_log(user_id){
    return new Promise ((resolve, reject) => {
      let type = "load_data_payment_log"
      var obj = { "user_id" : user_id}
      this.http.post(url + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  get_packet(){
    
    return  this.http.get("https://customer.discountpercent.com/api/get_packet") 
       .map((res) => res.json());
  }

  get_point(user_id){
    return new Promise ((resolve, reject) => {
      let type = "get_point"
      var obj = { "user_id" : user_id}
      this.http.post(url + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  get_unitlevel(){
    return  this.http.get("http://dcp.plus/api_dcp_coin/get_unitlevel") 
       .map((res) => res.json());
  }

  edit_account(user_id,user_name,phofile){
    return new Promise ((resolve, reject) => {
      let type = "edit_account"
      var obj = { "user_id" : user_id,"user_name" : user_name,  "profile" : phofile}
      this.http.post(url + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  edit_email(user_id,user_email){
    return new Promise ((resolve, reject) => {
      let type = "edit_email"
      var obj = { "user_id" : user_id,"user_email" : user_email}
      this.http.post(url + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  get_data_user(user_id){
    return new Promise ((resolve, reject) => {
      let type = "get_data_user"
      var obj = { "user_id" : user_id}
      this.http.post(url + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  get_h2h_topup(type_h2h){
    return new Promise ((resolve, reject) => {
      let type = "get_h2h_topup"
      var obj = { "topup_h2h_type" : type_h2h}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  get_money(topup_h2h_id){
    return new Promise ((resolve, reject) => {
      let type = "get_money"
      var obj = { "topup_h2h_id" : topup_h2h_id}
      this.http.post(url_2 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  insert_topup_mobile(data_topup){
    return new Promise ((resolve, reject) => {
      let type = "insert_topup_mobile"
      this.http.post(url_5 + type, JSON.stringify(data_topup))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  insert_topup_mobile_reword(data_topup){
    return new Promise ((resolve, reject) => {
      let type = "insert_topup_mobile_reword"
      this.http.post(url_5 + type, JSON.stringify(data_topup))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  get_topup_qr_log(data_insert_topup_mobile){
    return new Promise ((resolve, reject) => {
      let type = "get_topup_qr_log"
      this.http.post(url_5 + type, JSON.stringify(data_insert_topup_mobile))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  check_qr_topup(data_topup_log,data_topup_qr){
    return new Promise ((resolve, reject) => {
      let type = "check_qr_topup";
      var obj = { "data_topup_log" : data_topup_log , "data_topup_qr" : data_topup_qr}
      this.http.post(url_5 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  cancle_topup(topup_log_id,qrcode_img){
    return new Promise ((resolve, reject) => {
      let type = "cancle_topup";
      var obj = { "topup_log_id" : topup_log_id , "qrcode_img" : qrcode_img}
      this.http.post(url_5 + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  check_qrcode_payment(scanercode_id){
    return new Promise ((resolve, reject) => {
      let type = "check_qrcode_payment";
      var obj = { "scanercode_id" : scanercode_id }
      this.http.post(url + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }


  load_data_payment(data_discount,user_id){
    return new Promise ((resolve, reject) => {
      let type = "load_data_payment";
      var obj = { "payment_log_id" : data_discount , "user_id" : user_id}
      this.http.post(url + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

  buy_payment(payment_log_id){
    return new Promise ((resolve, reject) => {
      let type = "buy_payment";
      var obj = { "payment_log_id" : payment_log_id }
      this.http.post(url + type, JSON.stringify(obj))
      .map(res=> res.json())
        .subscribe(data => {
          resolve(data);
        },error =>{
          reject(error)
        })
    })
  }

 

}
