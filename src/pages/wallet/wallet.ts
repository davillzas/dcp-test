import { WithdrawDetailPage } from './../withdraw-detail/withdraw-detail';
import { MaketingPage } from './../maketing/maketing';
import { WithdrawHistoryPage } from './../withdraw-history/withdraw-history';
import { WithdrawPage } from './../withdraw/withdraw';
import { DepositPage } from './../deposit/deposit';
import { Component } from '@angular/core';
import { App,IonicPage,Platform,ActionSheetController, NavController, NavParams , AlertController, LoadingController, ToastController,Loading } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { ApiProvider } from './../../providers/api/api';
import { TranferPage } from '../tranfer/tranfer';
import { ReceivePage } from '../receive/receive';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera , CameraOptions } from '@ionic-native/camera';
declare var cordova: any;
/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
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
  cucumber : any;
  lastImage: any = null;
  user_id : any;
  data_user : any;
  user_data : any;
  phone : any;
  wallet : number;
  pet: string = "deposit";
  form_ton : FormGroup;
  check_bank_bnumber : number;
  check_bank_bnumber_history : number;
  bank_account : any;
  data_select_bank : any;
  data_bankacount_id : any;
  packet_card : any;
  user_monney : any ;

  constructor(
    public navCtrl: NavController, public navParams: NavParams ,public formBuilder: FormBuilder,public actionSheetCtrl : ActionSheetController,
    public platform : Platform,public alertCtrl: AlertController, public UserService: UserService ,public apiServe : ApiProvider,public loaddingCtrl : LoadingController
    ,public toastCtrl: ToastController , public app : App,private camera: Camera, private transfer: FileTransfer, 
    private file: File,
  ) {
    this.lastImage = 'assets/img/payment/no_pic.jpg';
      this.check_wallet();

      this.data_user = this.UserService.User_data();

      this.data_user.then(result =>{
        this.user_data = result;
        this.phone = this.user_data['0']['phone'];
      });

      this.authForm = formBuilder.group({
        /*username: ['',Validators.compose([Validators.required])],*/
        //Password_data: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        
        user_date: [''],
        user_time: [''],
        user_monney: [''],
      });

      this.get_bank_account();

      this.get_packet();

  }

  get_packet(){
   

    this.apiServe.get_packet()
    .subscribe((data) => {
      this.packet_card = data;
      //this.load_category(this.city_id)
    })
  }

  select_amount(data){
    this.user_monney = data;
  }


  presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
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

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    
    if(sourceType === this.camera.PictureSourceType.PHOTOLIBRARY){
      const options: CameraOptions = {
        quality: 50,
        
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: sourceType,
        saveToPhotoAlbum:false
        
      }

      this.camera.getPicture(options).then((imagePath) => {
          this.lastImage = 'data:image/jpeg;base64,' + imagePath; 
          this.uploadImage(this.lastImage);
      }, (err) => {
        this.presentToast('Error while selecting image.');
      });
    }else{
      const options: CameraOptions = {
        quality: 50,
        
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: sourceType,
        saveToPhotoAlbum:false
      }

      this.camera.getPicture(options).then((imagePath) => {
        this.lastImage =  imagePath;
        this.uploadImage(this.lastImage);
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
    }
    
   
    // Get the data of an image
    
  }

  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }

  private copyFileToLocalDir(namePath, currentName, newFileName) {
  
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = namePath;
      
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 5000,
      position: 'bottom'
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
    var name = this.createFileName()
    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: name,
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }

    //file transfer action
    fileTransfer.upload(targetPath, 'https://customer.discountpercent.com/api/upload_img_topup', options)
      .then((data) => {
        this.lastImage = 'https://customer.discountpercent.com/img/topup/' + name;
        loader.dismiss();
      }, (err) => {
        console.log(err);
        
        loader.dismiss();
      });
  }

 



  check_wallet(){
    this.data_user = this.UserService.User_data()
    this.data_user.then(result =>{
      
      this.user_id = result[0].user_id;
      
      this.apiServe.check_wallet_user(this.user_id)
      .then((data) => {
        this.wallet = data['wallet'];
      })
    })
  }

  get_bank_account(){
    this.data_user = this.UserService.User_data()
    this.data_user.then(result =>{
      
      this.user_id = result[0].user_id;
      
      this.apiServe.get_bank_account(this.user_id)
      .then((data) => {
        this.data_user = data;
        var picArr = [];
        if(this.data_user['suer_bank_account_id'] == undefined){
          
          for(var i=0; i <  this.data_user.length; i++){
            //console.log(this.data_user[i]['PromptPay']);
            //console.log(this.data_user[i]['bank_account_number']);

            if(this.data_user[i]['bank_account_number'] != null){
              var data_bank = 'บัญชีธนาคาร : '+ this.data_user[i]['bank_account_number'] +'';
            }else if(this.data_user[i]['PromptPay'] != null){
              data_bank = 'พร้อมเพย์: '+ this.data_user[i]['PromptPay'] +'';
            }

            data = [data_bank,this.data_user[i]['user_bank_account_id']];
            picArr.push(data);
          }

          
        }else{
          data_bank = 'ไม่พบข้อมูล';
          data = [data_bank,0];
          picArr.push(data);
        }
         
        this.data_select_bank = picArr;
        
      })
    })
  }

  updateCucumber(newObj){
      this.check_bank_bnumber = newObj;
  } 

  get_withdraw_user(){
    if(this.check_bank_bnumber == null){

      let alert = this.alertCtrl.create({
        title: 'เกิดข้อผิดพลาด!',
        subTitle: 'กรุณาเลือกรูปแบบการถอนเงิน',
        buttons: ['OK']
      });
      alert.present();

    }else{
      var data = this.check_bank_bnumber
      this.app.getRootNav().push(WithdrawPage,{'data' : data});
    }


  }

  
  onSubmit(value: any): void { 
    if(this.authForm.valid) {
      window.localStorage.setItem('user_date', value.user_date);
      window.localStorage.setItem('user_time', value.user_time);
      window.localStorage.setItem('user_monney', value.user_monney);
      
      if(value.user_date == ''){
        var msg = 'กรุณากรอกวันที่';
        this.alert_error(msg);
      }else if(value.user_time == ''){
        msg = 'กรุณากรอกเวลา';
        this.alert_error(msg);
      }else if(value.user_monney == ''){
        msg = 'กรุณากรอกจำนวนเงิน';
        this.alert_error(msg);
      }else if(this.lastImage == "assets/img/payment/no_pic.jpg"){
        msg = 'กรุณาเพิ่มสลิปการโอนเงิน';
        this.alert_error(msg);
      }else{
          var user_date =  value.user_date;
          var user_time = value.user_time;
          var user_monney = value.user_monney;
          var phone = this.phone;

          
          this.apiServe.insert_deposit_user(user_date,user_time,user_monney,phone).then((data) => {
            if(data['act'] == 1){
              this.alert_error(data['msg']);
            }else if(data['act'] == 2){

              let loading = this.loaddingCtrl.create({
                content: 'กรุณารอสักครู่...'
              });
            
              loading.present();
              
              setTimeout(() => {
                this.refresh();
                loading.dismiss();
              }, 3000);
            }
          });
      }
    }
  }

  onSubmit_ton(value: any): void{
    console.log(value);
    /*var msg = 'ขออภัยในขณะนี้ระบบถอนเงินยังไม่พร้อมใช้งาน ขออภัยในความไม่สะดวก';
    this.alert_error(msg);*/
    /*if(this.authForm.valid) {
      window.localStorage.setItem('bank', value.bank);
      window.localStorage.setItem('bank_number', value.bank_number);
      window.localStorage.setItem('bank_name', value.bank_name);
      window.localStorage.setItem('money', value.money);
      
      var bank = value.bank;
      var bank_number = value.bank_number;
      var bank_name = value.bank_name;
      var monney = value.monney;

      console.log(bank + ' ' + bank_number + ' ' + bank_name + ' ' + monney);
    }*/
  }

  alert_error(msg){
    let alert = this.alertCtrl.create({
      title: 'เกิดข้อผิดพลาด!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  refresh(){
    const toast = this.toastCtrl.create({
      message: 'บันทึกข้อมูลสำเร็จ',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();

    setTimeout(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      toast.dismiss();
    }, 1000);
  }

  

  deposit(){
    this.app.getRootNav().push(DepositPage,{'phone' : this.phone});
  }

  withdraw(){
    this.app.getRootNav().push(WithdrawDetailPage,{'user_id' : this.user_id});
  }

  tranfer(){
    this.app.getRootNav().push(TranferPage,{'user_id' : this.user_id});
  }

  receive(){
    this.app.getRootNav().push(ReceivePage,{'user_id' : this.user_id});
  }

  maketing(){
    this.app.getRootNav().push(MaketingPage,{'user_id' : this.user_id});
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.check_wallet()
      refresher.complete();
    }, 2000);
    
  }

  user_check_bank_account(newObj){
      this.check_bank_bnumber_history = newObj
  }

  get_withdraw_history(){
    if(this.check_bank_bnumber_history == null){

      let alert = this.alertCtrl.create({
        title: 'เกิดข้อผิดพลาด!',
        subTitle: 'กรุณาเลือกรูปแบบการถอนเงิน',
        buttons: ['OK']
      });
      alert.present();

    }else{
      var data = this.check_bank_bnumber_history;
      
      if(data == 0){
        
      }else{
        this.app.getRootNav().push(WithdrawHistoryPage,{'data' : data});
        
      }

    }
  }

}
