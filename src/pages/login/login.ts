import {   HistoryUserPage } from './../history-user/history-user';
import {   GetPhonePage } from './../get-phone/get-phone';
import {   PlaceService } from '../../services/place-service';
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import {   Component } from '@angular/core';
import {   FormBuilder,  FormGroup,  Validators,  AbstractControl} from '@angular/forms';
import {  IonicPage,  NavController,  NavParams,  LoadingController,  AlertController,  App} from 'ionic-angular';
import {  ApiProvider} from './../../providers/api/api';
import {  ForgotPasswordPage} from '../forgot-password/forgot-password';
import {  SignUpPage} from '../sign-up/sign-up';
import {  MainTabsPage} from '../main-tabs/main-tabs';
import {  UserService} from '../../services/user-service';
import {  Device} from '@ionic-native/device';
import {  Sim} from '@ionic-native/sim';
import {  InsertAdvisorCodePage} from '../insert-advisor-code/insert-advisor-code';
import { Apidcp } from "../../providers/api/apidcp";
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  authForm: FormGroup;
  public places: any;
  userData: any;
  data_user: any;
  check_user: any;
  public simInfo: any;
  public cards: any;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public apiServe: ApiProvider,
    public alertCtrl: AlertController,
    public loaddingCtrl: LoadingController,
    public UserService: UserService,
    public device: Device,
    public sim: Sim,
    public app: App,
    public Apidcp: Apidcp
  ) {
    this.check_user = false;

    this.authForm = formBuilder.group({
      /*username: ['',Validators.compose([Validators.required])],*/
      Password_data: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      phone_data: [
        "",
        Validators.compose([Validators.required, Validators.minLength(10)])
      ]
    });
  }

  onSubmit(value: any): void {
    if (this.authForm.valid) {
      window.localStorage.setItem("phone_data", value.phone_data);
      window.localStorage.setItem("phone_data", value.Password_data);

      var phone = value.phone_data;
      var password = value.Password_data;

      this.Apidcp.check_login(phone, password).then(data => {
        if (data["act"] == 1) {
          this.alert_present(data["msg"]);
        } else if (data["act"] == 2) {
          this.save_data_user(data["data"][0]);
        }
      });
    }
  }

  save_data_user(data) {
    var check_insert = this.UserService.Get_data(data);
    check_insert.then(result => {
      if (result == null) {
        var msg =
          "ไม่สามารถบันทึกข้อมูลสมาชิกลงบน Application ได้ กรุณาติดต่อเจ้าหน้าที่";
        this.alert_present(msg);
      } else {
        this.login();
      }
    });
  }

  alert_present(msg) {
    let alert = this.alertCtrl.create({
      title: "เกิดข้อผิดพลาด!",
      subTitle: msg,
      buttons: ["OK"]
    });
    alert.present();
  }

  // process login
  login() {
    this.nav.push(MainTabsPage);
  }

  register_page(){
    this.nav.push(SignUpPage);
  }
}
