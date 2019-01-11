import { CheckLoginPage } from './../check-login/check-login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController ,ActionSheetController} from 'ionic-angular';
import { LoadingController,AlertController,App } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera , CameraOptions } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';
import { UserService } from '../../services/user-service';
import { MainTabsPage } from '../main-tabs/main-tabs';
import { Apidcp } from "../../providers/api/apidcp";
declare var cordova: any;
/**
 * Generated class for the EditAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-edit-account",
  templateUrl: "edit-account.html"
})
export class EditAccountPage {
  user_id: any;
  login_id: any;
  form_edit_profile: FormGroup;
  form_edit_email: FormGroup;
  form_edit_password: FormGroup;
  data_profile: any;
  user_fname: any;
  user_lname: any;
  email: any;
  line: any;
  phofile: any = null;
  profile_new: any = null;
  public user_name: string = "";
  public user_email: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loaddingCtrl: LoadingController,
    public apiServe: ApiProvider,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private camera: Camera,
    private transfer: FileTransfer,
    private file: File,
    public actionSheetCtrl: ActionSheetController,
    public device: Device,
    public UserService: UserService,
    public app: App,
    public Apidcp: Apidcp
  ) {
    //this.phofile = 'assets/img/user/no-user-image-square.jpg';
    this.user_id = this.navParams.get("user_id");

    this.get_data_profile();

    this.form_edit_profile = formBuilder.group({
      user_fname: [""],
      user_lname: [""]
    });

    this.form_edit_email = formBuilder.group({
      user_email: [""]
    });

    this.form_edit_password = formBuilder.group({
      user_password: [""],
      user_password_again: [""]
    });
  }

  get_data_profile() {
    let data_get_user = this.UserService.User_data();

    data_get_user.then(result => {
      this.user_fname = result.user_new_fname;
      this.user_lname = result.user_new_lname;
      this.phofile = result.user_new_photo;

      if (this.phofile == "" || this.phofile == null) {
        this.phofile = "assets/img/user/no-user-image-square.jpg";
      }
    });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.get_data_profile();
      refresher.complete();
    }, 2000);
  }

  onSubmit_edit_profile_email(value: any): void {
    var user_email = value.user_email;
    const confirm = this.alertCtrl.create({
      title: "ยืนยันการทำรายการ",
      message: "คุณแน่ใจหรือไม่ที่ต้องการจะเปลี่ยนแปลงข้อมูลนี้",
      buttons: [
        {
          text: "ยืนยัน",
          handler: () => {
            this.edit_email(user_email);
          }
        },
        {
          text: "ยกเลิกรายการ",
          handler: () => {}
        }
      ]
    });
    confirm.present();
  }

  edit_email(user_email) {
    this.apiServe.edit_email(this.user_id, user_email).then(data => {
      if (data["act"] == 1) {
        this.presentToast(data["msg"]);
      } else {
        this.presentToast(data["msg"]);

        this.get_data_user(this.user_id);
      }
    });
  }

  onSubmit_edit_profile(value: any): void {
    if (this.form_edit_profile.valid) {
      var msg = "";
      window.localStorage.setItem("user_name", value.user_name);

      var user_fname = value.user_fname;
      var user_lname = value.user_lname;

      var profile = null;
      if (this.profile_new == null || this.profile_new == "") {
        profile = this.phofile;
      } else {
        profile = this.profile_new;
      }

      const confirm = this.alertCtrl.create({
        title: "ยืนยันการทำรายการ",
        message: "คุณแน่ใจหรือไม่ที่ต้องการจะเปลี่ยนแปลงข้อมูลนี้",
        buttons: [
          {
            text: "ยืนยัน",
            handler: () => {
              this.edit_profile(user_fname, user_lname, profile);
            }
          },
          {
            text: "ยกเลิกรายการ",
            handler: () => {}
          }
        ]
      });
      confirm.present();
    }
  }

  edit_profile(user_fname, user_lname, profile) {
    this.Apidcp.edit_account(this.user_id, user_fname, user_lname, profile).then(
      data => {
        if (data["act"] == 1) {
          this.presentToast(data["msg"]);
        } else {
          this.presentToast(data["msg"]);
          this.get_data_user(this.user_id);
        }
      }
    );
  }

  alert_present(msg) {
    let alert = this.alertCtrl.create({
      title: "เกิดข้อผิดพลาด!",
      subTitle: msg,
      buttons: ["OK"]
    });
    alert.present();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Select Image Source",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: "Use Camera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog

    if (sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      const options: CameraOptions = {
        quality: 50,

        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: sourceType,
        saveToPhotoAlbum: false
      };

      this.camera.getPicture(options).then(
        imagePath => {
          this.phofile = "data:image/jpeg;base64," + imagePath;
          this.uploadImage(this.phofile);
        },
        err => {
          this.presentToast("Error while selecting image.");
        }
      );
    } else {
      const options: CameraOptions = {
        quality: 50,

        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: sourceType,
        saveToPhotoAlbum: false
      };

      this.camera.getPicture(options).then(
        imagePath => {
          this.phofile = imagePath;
          this.uploadImage(this.phofile);
        },
        err => {
          this.presentToast("Error while selecting image.");
        }
      );
    }

    // Get the data of an image
  }

  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + "-" + this.user_id + ".jpg";
    return newFileName;
  }

  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file
      .copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
      .then(
        success => {
          this.phofile = namePath;
        },
        error => {
          this.presentToast("Error while storing file.");
        }
      );
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 5000,
      position: "bottom"
    });
    toast.present();
  }

  public uploadImage(targetPath) {
    //Show loading
    let loader = this.loaddingCtrl.create({
      content: "Uploading..."
    });
    loader.present();

    //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    //random int
    var random = Math.floor(Math.random() * 100);
    var name = this.createFileName();
    //option transfer
    let options: FileUploadOptions = {
      fileKey: "photo",
      fileName: name,
      chunkedMode: false,
      httpMethod: "post",
      mimeType: "image/jpeg",
      headers: {}
    };

    //file transfer action
    fileTransfer
      .upload(
        targetPath,
        "https://customer.discountpercent.com/api_dcp/upload_img_profile",
        options
      )
      .then(
        data => {
    
          this.phofile =
            "https://customer.discountpercent.com/img/img_profile/" + name;
          this.profile_new =
            "https://customer.discountpercent.com/img/img_profile/" + name;
          loader.dismiss();
        },
        err => {
          console.log(err);

          loader.dismiss();
        }
      );
  }

  get_data_user(user_id) {


    let loading = this.loaddingCtrl.create({
      spinner: 'hide',
      content: "กรุณารอสักครู่ระบบกำลังดำเนินการ...",
      duration: 3000
    });

    loading.present();
    setTimeout(() => {
      this.Apidcp.refresh_users(user_id).then(data => {
        var user_data = data[0];
        var remove_user_data = this.UserService.clear_user_data();
        if (remove_user_data == "1") {
          let check_user = this.UserService.Get_data(user_data);
          check_user.then(result => {
            if (result != null) {
              this.navCtrl.push(MainTabsPage);
            }
          })
        }
      });
    }, 1000);


  }
}
