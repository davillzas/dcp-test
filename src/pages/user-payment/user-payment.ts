import { LoginPage } from './../login/login';
import { CheckLoginPage } from './../check-login/check-login';
import { Headers } from '@angular/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { App,IonicPage,Platform,ActionSheetController, NavController, NavParams , AlertController, LoadingController, ToastController,Loading   } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ApiProvider } from './../../providers/api/api';
import { FilePath } from '@ionic-native/file-path';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { UserService } from '../../services/user-service';
import { MainTabsPage } from '../main-tabs/main-tabs';


/**
 * Generated class for the UserPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-user-payment',
  templateUrl: 'user-payment.html',
})
export class UserPaymentPage {
  user_data : any;
  advisor_code : any;
  lastImage: string = null;
  loading: Loading;
  imageURI:any;
  imageFileName:any;
  img1: any;
  file_img : any;
  image_payment: any;
  User_data : any;
  User_id : any;
  user_web : any;
  name : any;
  user_activation : any
  data_user:any;
  value_data : any;

  public slides = [
    {
      src: 'http://customer.discountpercent.com/img/img_payment/payment-01-1.png'
    },
    {
      src: 'http://customer.discountpercent.com/img/img_payment/payment-02.jpg'
    },
    {
      src: 'http://customer.discountpercent.com/img/img_payment/payment-03.jpg'
    },
  ];

  authForm: FormGroup;
  constructor(public navCtrl: NavController,
    //private filetransfer: FileTransfer,
    public app:App ,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public apiServe : ApiProvider,
    public alertCtrl: AlertController,
    public actionSheetCtrl : ActionSheetController,
    public platform : Platform,
    public filePath : FilePath,
    public file : File,
    public transfer : Transfer,
    public UserService: UserService,
    
  ) {
    this.data_user = this.UserService.User_data();

    this.data_user.then(result =>{
 
      this.value_data = result;
      if(this.value_data == null){
        this.app.getRootNav().push(LoginPage);
      }
    })

    platform.ready().then(() => {
      //StatusBar.styleDefault();
      //Splashscreen.hide();

      //Registration of push in Android and Windows Phone
      platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNav();
        if (nav.canGoBack()){ //Can we go back?
          nav.pop();
        }else{
          let confirm = this.alertCtrl.create({
            title: 'ออกจากระบบ?',
            message: 'คุณแน่ใจหรือไม่ที่ต้องการที่จะออกจาก Discount',
            buttons: [
              {
                text: 'ยืนยัน',
                handler: () => {
                  this.platform.exitApp(); //Exit from app
                }
              },
              {
                text: 'ยกเลิก',
                handler: () => {
                 
                }
              }
            ]
          });
          confirm.present();
          
        }
      });
    });
    

    this.authForm = formBuilder.group({
      user_name: [''],
      user_date: [''],
      user_time: [''],
      user_monney: [''],
      user_img: [''],
      advisor_code: ['',Validators.compose([Validators.minLength(9)])],
    })

    this.User_data = this.UserService.User_data()
      this.User_data.then(result =>{
          this.user_data = result;
          //console.log(this.user_data['0']['phone']);
          this.check_user_web(this.user_data['0']['phone']);
      });
  }

  check_user_web(user_phone){
    //console.log(user_phone);
    this.apiServe.check_user_web(user_phone).then((data) => {
        this.user_web = data;
        if(this.user_web.lenght == 0){

        }else{
          this.name = this.user_web['0']['name'];
          this.user_activation = this.user_web['0']['advisor_code'];

          //console.log(this.name);
          //console.log(this.user_activation);
        }
    })
  }

  upload(){

    /*const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });*/

    let actionSheet = this.actionSheetCtrl.create({
      title: 'เลือกแหล่งที่มาของภาพ',
      buttons: [
        {
          text: 'เปิดจากไฟล์',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'ถ่ายภาพ',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


  takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
  
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      //this.platform.is('android') && 
      this.imageURI = imagePath;
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  } 

  createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage =  newFileName;
      this.image_payment = 'data:image/jpeg;base64,' + this.lastImage

    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
    

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

   /*fileChange(event){
  
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.img1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
      let fileList: FileList = event.target.files;  
      let file: File = fileList[0];
      this.file_img = file
      //console.log(file);
      
      if(file == undefined){
        this.img1 = '';
      }
  }*/



  onSubmit(value: any): void { 
    if(this.authForm.valid) {
        window.localStorage.setItem('user_name', value.user_name);
        window.localStorage.setItem('user_date', value.user_date);
        window.localStorage.setItem('user_time', value.user_time);
        window.localStorage.setItem('user_monney', value.user_monney);
        window.localStorage.setItem('advisor_code', value.advisor_code);

       

          if(value.user_name == ''){
            alert('กรุณากรอกชื่อ นามสกุล');
          }else if(value.user_date == ''){
            alert('กรุณากรอกวันที่');
          }else if(value.user_time == ''){
            alert('กรุณากรอกเวลา');
          }else if(value.user_monney == ''){
            alert('กรุณากรอกจำนวนเงิน');
          }else{
          
          
            var user_name = value.user_name;
            var user_date =  value.user_date;
            var user_time = value.user_time;
            var user_monney = value.user_monney;
            var advisor_code = value.advisor_code;
            if (advisor_code == ''){
              alert('กรุณากรอกรหัส ผู้แนะนำ');
            }else{
              this.User_data.then(result =>{
              var phone = result[0].phone;
              if(phone == advisor_code){
                alert('ไม่สามารถใช้รหัสผ่านผู้แนะนำนี้ได้');
              }else{
                this.apiServe.check_advisor_code(advisor_code).then((data) => {
                  if(data['act'] == 1){
                    let alert = this.alertCtrl.create({
                      title: 'ไม่พบรหัสผู้แนะนำ!',
                      subTitle: data['msg'],
                      buttons: ['OK']
                    });
                    alert.present();  
                  }else if(data['act'] == 2){
                    this.User_data.then(result =>{
                      var user_id = result[0].user_id;
                        this.apiServe.save_user_payment(user_id,user_name,user_date,user_time,user_monney,advisor_code).then((data) => {
                          
                          if(data['act'] == 1){
                          let alert = this.alertCtrl.create({
                            title: 'เกิดข้อผิดพลาด!',
                            subTitle: data['msg'],
                            buttons: ['OK']
                          });
                          alert.present();
                          }else{
                          let alert = this.alertCtrl.create({
                            title: 'ทำรายการสำเร็จ',
                            subTitle: 'ทำการยืนยันเสร็จสิ้น รหัสการยืนยันของท่านคือ ' + data['data'],
                            buttons: [
                              {
                                text: 'ยืนยัน',
                                handler: () => {
                                  let toast = this.toastCtrl.create({
                                    message: 'กรุณารอสักครู่',
                                    duration: 3000,
                                    position: 'bottom'
                                  });
                                
                                    
                                    this.load_index(data['data_user'])
                                  
                                }
                              }
                            ]
                          });
                          alert.present();    
                        }
                      })
                    })
                  }
                })
              }
              });
            }
           
        }
      }
  }

  load_index(data_user){
    /*var remove_user_data = this.UserService.remove_user_data();
    
    if(remove_user_data == '1'){
      var get_user_data = this.UserService.Get_data(data_user);
      if(get_user_data == '1'){
        this.navCtrl.push(MainTabsPage);
      }
    }*/
  }

  exit(){
    var login_code = this.value_data[0]['login_code'];


    let confirm = this.alertCtrl.create({
      title: 'คุณแน่ใจหรือไม่ที่จะออกจากระบบ ?',
      message: 'เมื่อกดยืนยันระบบจะทำการ ออกจากระบบ',
      buttons: [
        {
          text: 'ยืนยัน',
          handler: () => {
            //this.data_user = this.UserService.clear_user_data();
            this.edit_logout(login_code);
          }
        },
        {
          text: 'ยกเลิก',
          handler: () => {
            
          }
        }
      ]
    });
    confirm.present();
    
  }

  edit_logout(login_code){
    this.apiServe.edit_logout(login_code).then((data) => {
      if(data['act'] == 1){
        let alert = this.alertCtrl.create({
          title: 'เกิดข้อผิดพลาด!',
          subTitle: data['msg'],
          buttons: ['OK']
        });
        alert.present();
      }else{
        this.logout();
      }
    });
   
  }

  logout(){
    this.data_user = this.UserService.clear_user_data();
   
    let loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: "กรุณารอสักครู่ระบบกำลังดำเนินการ...",
        duration: 3000
    });
          
    loading.present();
      setTimeout(() => {
        this.navCtrl.setRoot(LoginPage);
    }, 1000);
  }

  refresh_user(){

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...'
    });
  
    loading.present();

    this.User_data = this.UserService.User_data()
    this.User_data.then(result =>{
                                   var user_id = result[0].user_id;

                                   /*this.apiServe.refresh_users(user_id)
        .then((data) => {
          var user_data = data;
          var remove_user_data = this.UserService.clear_user_data();
          if(remove_user_data == '1'){
            setTimeout(() => {
              var get_user_data = this.UserService.Get_data(user_data);
              if(get_user_data == '1'){
                setTimeout(() => {
                  this.navCtrl.push(MainTabsPage);
                }, 1000);

                setTimeout(() => {
                  loading.dismiss();
                }, 2000);
              }
            }, 1000);
          }
          /*var remove_user_data = this.UserService.remove_user_data();
          if(remove_user_data == '1'){
            this.nav.push(MainTabsPage);
            setTimeout(() => {
              loading.dismiss();
            }, 3000);
          }*/
                                   /*var remove_user_data = this.UserService.remove_user_data();
          if(remove_user_data == '1'){
            var get_user_data = this.UserService.Get_data(data);
            if(get_user_data == '1'){

              setTimeout(() => {
                this.nav.push(MainTabsPage);
              }, 1000);

              setTimeout(() => {
                loading.dismiss();
              }, 5000);
            }
          }
      })*/
    })
  }
}
