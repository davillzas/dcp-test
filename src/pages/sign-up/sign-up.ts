
import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {IonicPage, NavController, NavParams ,ActionSheetController ,LoadingController,ToastController} from 'ionic-angular';
import {ForgotPasswordPage} from '../forgot-password/forgot-password';
import {MainTabsPage} from '../main-tabs/main-tabs';
import { ApiProvider } from './../../providers/api/api';
import { AlertController } from 'ionic-angular';
import { UserService } from '../../services/user-service';
import { LoginPage } from '../login/login';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera , CameraOptions } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';
import { Apidcp } from '../../providers/api/apidcp';

declare var cordova: any;
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: "page-sign-up",
  templateUrl: "sign-up.html"
})
export class SignUpPage {
  authForm: FormGroup;
  data_user: any;
  adviser_name: any;
  adviser_id: any;
  adviser_data: any;
  phone: any;
  email: any;
  phofile: any = null;
  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public apiServe: ApiProvider,
    public alertCtrl: AlertController,
    public loaddingCtrl: LoadingController,
    public UserService: UserService,
    private camera: Camera,
    private transfer: FileTransfer,
    private file: File,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public device: Device,
    public Apidcp: Apidcp
  ) {
    this.phofile = "assets/img/user/no-user-image-square.jpg";
    this.authForm = formBuilder.group({
      fname: ["", Validators.compose([Validators.required])],
      lname: ["", Validators.compose([Validators.required])],
      phone_data: [
        "",
        Validators.compose([Validators.required, Validators.minLength(10)])
      ],
      Password_data: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      password_data_again: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      email_data: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ],
      adviser_data: [
        "",
        Validators.compose([Validators.required, Validators.minLength(10)])
      ]
    });
  }

  check_adviser(event: any) {
    let data_check_adviser = event.target.value;
    this.Apidcp.check_adviser(data_check_adviser).then(data => {
      if (data == null) {
        this.adviser_data = null;
        this.adviser_name = null;
        this.adviser_id = null;
        var err = "ไม่พบผู้แนะนำ";
        this.presentToast(err);
      } else {
        this.adviser_name =
          data[0].user_new_fname + " " + data[0].user_new_lname;
        this.adviser_id = data[0].user_new_id;
      }
    });
  }

  onSubmit(value: any): void {
    if (this.authForm.valid) {
      window.localStorage.setItem("fname", value.fname);
      window.localStorage.setItem("lname", value.lname);
      window.localStorage.setItem("phone_data", value.phone_data);
      window.localStorage.setItem("Password_data", value.Password_data);
      window.localStorage.setItem(
        "password_data_again",
        value.password_data_again
      );
      window.localStorage.setItem("email_data", value.email_data);
      window.localStorage.setItem("adviser_data", value.adviser_data);

      var fname = value.fname;
      var lname = value.lname;
      var phone = value.phone_data;
      var password = value.Password_data;
      var password_data_again = value.password_data_again;
      var email = value.email_data;
      var advisor = value.adviser_data;



      if (password != password_data_again) {
        var err = "กรุณากรอกรหัสผ่านของท่านให้ตรงกัน";
        this.presentToast(err);
      } else {
        this.Apidcp.check_user_phone(phone).then(data => {
          if (data["act"] == 1) {
            this.phone = null;
            this.presentToast(data["msg"]);
          } else {
            this.Apidcp.check_user_email(email).then(data => {
              if (data["act"] == 1) {
                this.email = null;
                this.presentToast(data["msg"]);
              } else {
                this.Apidcp.register_user(fname, lname, phone, password, email, advisor).then(
                  data => {
                    if (data["act"] == 1) {
                      this.presentToast(data["msg"]);
                      this.refresh_register();
                    } else {
                      this.presentToast(data["msg"]);
                      this.refresh_register();
                    }
                  }
                );
              }
            });
          }
        });
      }
    }
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 5000,
      position: "bottom"
    });
    toast.present();
  }

  refresh_register() {
    let loading = this.loaddingCtrl.create({
      spinner: "hide",
      content: "กรุณารอสักครู่ระบบกำลังดำเนินการ...",
      duration: 3000
    });

    loading.present();
    setTimeout(() => {
      this.nav.setRoot(LoginPage);
    }, 1000);
  }
}
