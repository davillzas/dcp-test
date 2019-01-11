import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let url = "https://dcp.plus/api/";


//let url_localhost = "http://localhost/discountpersent/index.php/api/"
@Injectable()
export class Apiplus {
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

  edit_account(user_detail_id, user_name, phofile) {
    return new Promise((resolve, reject) => {
      let type = "edit_account";
      var obj = {
        user_detail_id: user_detail_id,
        user_detail_name: user_name,
        user_detail_photo: phofile
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

  register_user(name, phone, password, email, adviser_id) {
    return new Promise((resolve, reject) => {
      let type = "register_user";
      var obj = {
        user_detail_name: name,
        user_detail_phone: phone,
        user_detail_password: password,
        user_detail_email: email,
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

  get_icon_h2h() {
    return this.http
      .get("https://dcp.plus/api/get_icon_h2h")
      .map(res => res.json());
  }

  load_slides() {
    return this.http
      .get("https://dcp.plus/api/get_slip_app")
      .map(res => res.json());
  }

  get_h2h_topup(type_h2h) {
    return new Promise((resolve, reject) => {
      let type = "get_h2h_topup";
      var obj = { topup_h2h_type: type_h2h };
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

  get_money(topup_h2h_id) {
    return new Promise((resolve, reject) => {
      let type = "get_money";
      var obj = { topup_h2h_id: topup_h2h_id };
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

  checkpassword(password, phone) {
    return new Promise((resolve, reject) => {
      let type = "checkpassword";
      var obj = { user_detail_password: password, user_detail_phone: phone };
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

  load_log(user_detail_id) {
    console.log(user_detail_id);
    return new Promise((resolve, reject) => {
      let type = "load_log";
      this.http
        .post(url + type, JSON.stringify(user_detail_id))
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