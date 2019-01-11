import { WalletPage } from './../wallet/wallet';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController ,LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiProvider } from './../../providers/api/api';
import { UserService } from '../../services/user-service';

/**
 * Generated class for the WithdrawHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-withdraw-history',
  templateUrl: 'withdraw-history.html',
})
export class WithdrawHistoryPage {
  form_withdown_prompay : FormGroup;
  form_withdown : FormGroup; 
  bank_number_check : any;
  data_bank_account : any;
  check_form : any;
  bank : any;
  wallet : any;
  data_user : any;
  user_id : any;

  constructor(public navCtrl: NavController, public navParams: NavParams , public formBuilder : FormBuilder
    , public alertCtrl: AlertController , public apiServe : ApiProvider, public UserService: UserService
    ,public loaddingCtrl : LoadingController ,public toastCtrl: ToastController
  ) {
    this.bank_number_check = this.navParams.get('data');
    
    this.form_withdown = formBuilder.group({
      money: ['']
    });

    this.get_data_bank_number(this.bank_number_check);
    this.check_wallet();
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


  get_data_bank_number(bank_number_check){
    var data_bank_number = bank_number_check
    this.apiServe.get_data_bank_number(data_bank_number)
      .then((data) => {
        this.data_bank_account = data;

        if(this.data_bank_account[0]['PromptPay'] == null){
          this.check_form = '1';
        }else{
          this.check_form = '2';
        }

        if(this.data_bank_account[0]['name_bank'] == 'BBL'){
          this.bank = 'ธนาคารกรุงเทพ จำกัด(มหาชน)';
        }else if(this.data_bank_account[0]['name_bank'] == 'BBC'){
          this.bank = 'ธนาคารกรุงเทพพาณิชย์การ';
        }else if(this.data_bank_account[0]['name_bank'] == 'KTB'){
          this.bank = 'ธนาคารกรุงไทย(มหาชน)';
        }else if(this.data_bank_account[0]['name_bank'] == 'BAY'){
          this.bank = 'ธนาคารกรุงศรีอยุธยา(มหาชน)';
        }else if(this.data_bank_account[0]['name_bank'] == 'KBANK'){
          this.bank = 'ธนาคารกสิกรไทย(มหาชน)';
        }else if(this.data_bank_account[0]['name_bank'] == 'CITI'){
          this.bank = 'ธนาคารซิตี้แบงค์';
        }else if(this.data_bank_account[0]['name_bank'] == 'TMB'){
          this.bank = 'ธนาคารทหารไทย(มหาชน)';
        }else if(this.data_bank_account[0]['name_bank'] == 'SCB'){
          this.bank = 'ธนาคารไทยพาณิชย์(มหาชน)';
        }else if(this.data_bank_account[0]['name_bank'] == 'NBANK'){
          this.bank = 'ธนาคารธนชาติ';
        }else if(this.data_bank_account[0]['name_bank'] == 'SCIB'){
          this.bank = 'ธนาคารนครหลวงไทย';
        }else if(this.data_bank_account[0]['name_bank'] == 'GSB'){
          this.bank = 'ธนาคารออมสิน';
        }else if(this.data_bank_account[0]['name_bank'] == 'GHB'){
          this.bank = 'ธนาคารอาคารสงเคราะห์';
        }


      })
  }

  onSubmit_withdown(value: any): void{
    if(this.form_withdown.valid) {
      var msg = "";
      window.localStorage.setItem('money', value.money);

    
      var money = value.money;


      if(money == ''){
        msg  = "กรุณากรอกจำนวนเงินที่ต้องการถอน";
        this.alert_error(msg);
      }else{
        
        if(Number(this.wallet) < Number(money)){
          msg  = "ไม่สามารถถอนเงินออกจากระบบได้เนื่องจาก จำนวนเงินในกระเป๋า ไม่พอในการถอนเงิน";
          this.alert_error(msg);
        }else{
          this.insert_withdown_bank(money);
        }
      }
    }
  }

 

  insert_withdown_bank(money){
    var PromptPay = this.data_bank_account[0]['PromptPay'];
    var bank_account_number = this.data_bank_account[0]['bank_account_number'];
    var name_account = this.data_bank_account[0]['name_account'];
    var name_bank = this.data_bank_account[0]['name_bank'];
    var status_bank = this.data_bank_account[0]['status_bank'];
    var user_bank_account_id = this.data_bank_account[0]['user_bank_account_id'];
    var user_id = this.data_bank_account[0]['user_id'];


    if(bank_account_number != null){
      this.apiServe.insert_withdown_bank(name_bank,bank_account_number,name_account,money,user_id).then((data) => {
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
    }else if(PromptPay != null){
      this.apiServe.insert_withdown_bank_payment(name_bank,PromptPay,name_account,money,user_id).then((data) => {
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

  refresh(){
    const toast = this.toastCtrl.create({
      message: 'บันทึกข้อมูลสำเร็จ',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();

    setTimeout(() => {
      this.navCtrl.setRoot(WalletPage);
      toast.dismiss();
    }, 1000);
  }

  alert_error(msg){
    let alert = this.alertCtrl.create({
      title: 'เกิดข้อผิดพลาด!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
  

}
