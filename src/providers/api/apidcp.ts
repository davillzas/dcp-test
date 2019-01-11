import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let url = "https://customer.discountpercent.com/api_dcp/";
let url_2 = "https://customer.discountpercent.com/boot_runscript/";

//let url_localhost = "http://localhost/discountpersent/index.php/api/"
@Injectable()
export class Apidcp {
  constructor(public http: Http) {
    //console.log('Hello ApiProvider Provider');
  }
  check_login(username, password) {
    return new Promise((resolve, reject) => {
      let type = "check_login";
      var obj = { username: username, password: password };
      this.http
        .post(url + type, JSON.stringify(obj))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  refresh_users(user_detail_id) {
    return new Promise((resolve, reject) => {
      let type = "refresh_users";
      var obj = { user_detail_id: user_detail_id };
      this.http
        .post(url + type, JSON.stringify(obj))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  check_adviser(data_check_adviser) {
    return new Promise((resolve, reject) => {
      let type = "check_adviser";
      var obj = { data_check_adviser: data_check_adviser };
      this.http
        .post(url + type, JSON.stringify(obj))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  check_user_phone(phone) {
    return new Promise((resolve, reject) => {
      let type = "check_user_phone";
      var obj = { user_detail_phone: phone };
      this.http
        .post(url + type, JSON.stringify(obj))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  check_user_email(email) {
    return new Promise((resolve, reject) => {
      let type = "check_user_email";
      var obj = { user_detail_email: email };
      this.http
        .post(url + type, JSON.stringify(obj))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  register_user(fname, lname, phone, password, email, adviser_id) {
    return new Promise((resolve, reject) => {
      let type = "register_user";
      var obj = {
        user_new_fname: fname,
        user_new_lname: lname,
        user_new_phone: phone,
        user_new_password: password,
        user_new_email: email,
        adviser_id: adviser_id
      };
      this.http
        .post(url + type, JSON.stringify(obj))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  load_slides() {
    return this.http
      .get("https://customer.discountpercent.com/api_dcp/get_slip_app")
      .map(res => res.json());
  }

  edit_account(user_new_id, user_new_fname, user_new_lname, phofile) {
    return new Promise((resolve, reject) => {
      let type = "edit_account";
      var obj = {
        user_new_id: user_new_id,
        user_new_fname: user_new_fname,
        user_new_lname: user_new_lname,
        user_new_photo: phofile
      };
      this.http
        .post(url + type, JSON.stringify(obj))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  get_point(user_new_id) {
    return new Promise((resolve, reject) => {
      let type = "get_point";
      var obj = { user_new_id: user_new_id };
      this.http
        .post(url + type, JSON.stringify(obj))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  insert_topup_mobile(data_insert) {
    return new Promise((resolve, reject) => {
      let type = "insert_topup_mobile";
      this.http
        .post(url + type, JSON.stringify(data_insert))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  insert_topup_mobile_reword(data_insert) {
    return new Promise((resolve, reject) => {
      let type = "insert_topup_mobile_reword";
      this.http
        .post(url + type, JSON.stringify(data_insert))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  checkpassword(phone, password) {
    return new Promise((resolve, reject) => {
      let type = "checkpassword";
      var obj = { user_new_password: password, user_new_phone: phone };
      this.http
        .post(url + type, JSON.stringify(obj))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  insert_withdown(user_new_id, tbd_code, money) {
    return new Promise((resolve, reject) => {
      let type = "insert_withdown";
      var obj = { user_new_id: user_new_id, tbd_code: tbd_code, money: money };
      this.http
        .post(url + type, JSON.stringify(obj))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  load_log_topup(user_new_id){
    return new Promise((resolve, reject) => {
      let type = "load_log_topup";
      var obj = { user_new_id: user_new_id};
      this.http
        .post(url + type, JSON.stringify(obj))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }
}