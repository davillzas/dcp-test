import { Apidcp } from './../../providers/api/apidcp';
import { BankQrcodePage } from './../bank-qrcode/bank-qrcode';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController,LoadingController } from 'ionic-angular';
//import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ApiProvider } from './../../providers/api/api';
import { UserService } from '../../services/user-service';
import {MainTabsPage} from '../main-tabs/main-tabs';
import { Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BrowserTab } from '@ionic-native/browser-tab';

/**
 * Generated class for the QrCodeDiscoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-code-discout',
  templateUrl: 'qr-code-discout.html',
})
export class QrCodeDiscoutPage {
  private data_user:any;
  user_id : any;
  customer_name : any
  value_data : any;
  data_discount : any;
  data_qr_code : any;
  salary : number;
  discount : number;
  total_discount : number;
  value_target : number;
  value_user: number;
  wallet : number;
  monney_return : number;
  cut_persent : number;
  deduction : number;
  qr_code_id : any;
  qr_code_discount : number;
  marketing : number;
  team_promote : number;
  promotion : number;
  t_deduction : number;
  sum_dues : number;

  sum_dues_marketing : number;
  sum_dues_team_promote : number;
  sum_dues_promotion : number;
  sum_dues_deduction : number;
  no_dust : number;
  check_hide_dus : any;

  cut_discout : number;

  cut_persent_t : number;
  phone : any;
  data_payment : any;
  payment_log_id : any;
  payment_log_msg : any;
  payment_log_amont : any;
  shop_name : any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams
    , public apiServe : ApiProvider, public UserService: UserService
    , public alertCtrl: AlertController ,public toastCtrl: ToastController
    ,public loadingCtrl : LoadingController , public iab : InAppBrowser
    , public browserTab: BrowserTab, public Apidcp: Apidcp
  ) {
    this.data_discount = this.navParams.get('data_qrcode');
   
    let loader = this.loadingCtrl.create({ content: "กรุณารอสักครู่..." });

    loader.present();
    this.get_user_data();
    setTimeout(() => {
      loader.dismiss();
    }, 1000);

    this.total_discount = 0;
    this.discount = 0;
    this.cut_discout = 0;
    this.deduction = 0;
    this.cut_persent_t = 0;
  }

  get_user_data(){
    this.data_user = this.UserService.User_data()
    this.data_user.then(result => {
      this.user_id = result.user_new_id;
      this.phone = result.user_new_phone;
      console.log(this.phone);
      this.check_wallet();
      this.discunt(this.data_discount, this.user_id);
    })
    
    
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.check_wallet()
      this.discunt(this.data_discount,this.user_id);
      refresher.complete();
    }, 2000);
    
  }

  check_wallet(){
    this.Apidcp.get_point(this.user_id).then(data => {
      if (data == null) {
        this.wallet = 0;
      } else {
        this.wallet = data[0].user_new_coin;
      }
    });
  }

  

  discunt(data_discount,user_id){
  
    this.apiServe.load_data_payment(data_discount,user_id)
        .then((data) => {
         
          this.data_payment = data;
          console.log(this.data_payment)
          if(this.data_payment == null){
            let msg = "ไม่พบข้อมูลการชำระเงินของร้านค้า";
            this.alert_er(msg);
            this.navCtrl.push(MainTabsPage);
          }else{
            this.payment_log_id = this.data_payment[0]['payment_log_id'];
            this.payment_log_msg = this.data_payment[0]['payment_log_msg'];
            this.payment_log_amont = this.data_payment[0]['payment_log_amont'];
            this.shop_name = this.data_payment[0]['shop_name'];
          }  
    })
  }

  pay_payment(){
    if (Number(this.payment_log_amont) > Number(this.wallet)) {
      let msg = "ไม่สามารถทำรายการได้เนื่องจาก ยอด DPC Reword ไม่เพียงพอในการชำระเงินรายการนี้";
      this.alert_msg_insert_transfer_user(msg);
    } else {
      this.check_pin_user();
    }
  }

  check_pin_user(){
    let prompt = this.alertCtrl.create({
      title: "ระบบตรวจสอบการจ่ายเงิน",
      message: "กรุณากรอก Password เพื่อใช้ในการยืนยันการชำระเงิน",
      inputs: [
        {
          name: "pin_wallet",
          placeholder: "กรุณาเพิ่มข้อมูล Password",
          type: "password"
        }
      ],
      buttons: [
        {
          text: "ยืนยัน",
          handler: data => {
            this.Apidcp.checkpassword(this.phone, data["pin_wallet"]).then(
              data => {
                if (data["act"] == 1) {
                  this.alert_error_pin(data["msg"]);
                } else if (data["act"] == 2) {
                  this.onsubmit_buy_payment();
                }
              }
            );
          }
        },
        {
          text: "ยกเลิก",
          handler: data => {}
        }
      ]
    });
    prompt.present();
  }
  
  alert_er(msg){
    let alert = this.alertCtrl.create({
      title: 'เกิดปัญหา!',
      subTitle: msg,
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
  }
  
  alert_error_pin(msg){
    let alert = this.alertCtrl.create({
      title: 'เกิดปัญหา!',
      subTitle: msg,
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.check_pin_user();
          }
        }
      ]
    });
    alert.present();
  }

  onsubmit_buy_payment(){
    let loading = this.loadingCtrl.create({
      content: 'กรุณารอสักครู่'
    });
    loading.present();   

    this.apiServe.buy_payment(this.payment_log_id)
    .then((data) => {
      if(data['act'] == "1"){
        let msg = "ไม่สามารถชำระเงิน รายการนี้ได้ กรุณาติดต่อเจ้าหน้าที่";
        this.alert_er(msg);
        loading.dismiss();
      }else if(data['act'] == "2"){
        let alert = this.alertCtrl.create({
          title: 'บันทึกข้อมูลเรียบร้อย',
          subTitle: "ระบบได้ทำการบันทึกข้อมูลการใช้จ่ายของท่านเรียบร้อยแล้ว",
          buttons: ['OK']
        });
        alert.present();
  
        setTimeout(() => {
          this.get_main_page()
          loading.dismiss();
        }, 3000);
      }
    });
    
  }

  get_dues(){
    this.apiServe.get_dues()
    .subscribe((data) => {
        this.marketing = Number(data[0].dues_payment_marketing);
        this.team_promote = Number(data[0].dues_payment_team_promote);
        this.promotion = Number(data[0].dues_payment_promotion);
        this.t_deduction = Number(data[0].dues_payment_deduction);
        this.sum_dues = (this.marketing + this.team_promote + this.promotion + this.t_deduction);
        
        
        this.no_dust = Number(data[0].dues_payment_persent);
       
        let loading = this.loadingCtrl.create({
          content: 'กรุณารอสักครู่'
        });
      
        loading.present();    
        setTimeout(() => {
          this.check_hide_dus = true;
          /*if(this.no_dust >  this.qr_code_discount){
            this.check_hide_dus = true;
          }else{
            this.check_hide_dus = false;
          }*/
          this.cut_persent_t = this.qr_code_discount - this.sum_dues;
          loading.dismiss();
        }, 1000);
        
        

      
        
        
        //console.log("ค่าการตลาด :" + this.marketing + "ค่าทีมโปรโมท :" +  this.team_promote + "ค่าจัดโปร :" + this.promotion + "เข้าบริษัท :" + this.t_deduction + "รวม :" + this.sum_dues);
    })
  }



  onKey(event: any){
    //this.data_qr_code[0].qr_code_discount
    this.value_target = event.target.value;
      
      if(this.check_hide_dus == false){
        this.discount = event.target.value * this.data_qr_code[0].qr_code_discount / 100;
      
        this.cut_discout = event.target.value * this.sum_dues / 100;
        
        //this.discount = event.target.value * this.data_qr_code[0].qr_code_discount / 100;
        
        this.cut_persent = this.cut_discout;
        this.total_discount = event.target.value - this.discount;

        this.deduction = (this.discount - this.cut_persent);
        this.total_discount = this.value_target - this.deduction;

        

        this.sum_dues_marketing =  this.value_target * this.marketing / 100;
        this.sum_dues_team_promote =  this.value_target * this.team_promote / 100;
        this.sum_dues_promotion =  this.value_target * this.promotion / 100;
        this.sum_dues_deduction =  this.value_target * this.t_deduction / 100;
      }else if(this.check_hide_dus == true){
        //this.total_discount = this.discount - event.target.value;
        this.discount = event.target.value * this.data_qr_code[0].qr_code_discount / 100;
        this.total_discount = this.value_target - this.discount;
      }
    
    
   
    //this.cut_persent = (Number(this.sum_dues_marketing.toFixed(2)) + Number(this.sum_dues_team_promote.toFixed(2)) + Number(this.sum_dues_promotion.toFixed(2)) + Number(this.sum_dues_deduction.toFixed(2)));
   
    //this.cut_persent = (this.discount * sum / 100;
  
  }

  ClearInput(event: any){
    event.target.value = 0
  }


  get_discount(){
    //console.log(this.total_discount);
    //console.log(this.value_target);
    var msg = "";
    if(this.value_target == null){
   
      msg = 'กรุณากรอกจำนวนเงิน'
      this.alert_msg_insert_transfer_user(msg)
    }else if(this.total_discount > this.wallet){
      msg = 'ไม่สามารถทำรายการได้เนื่องจาก ยอดเงินในกระเป๋าเงินไม่พอ'
      this.alert_msg_insert_transfer_user(msg)
    }else{
      this.data_user = this.UserService.User_data();
        this.data_user.then(result =>{
        //console.log(result[0])
        var phone = result[0].phone;
        this.apiServe.check_pin(phone)
        .then((data) => {
          if(data['act'] == 1){
            //this.insert_pin(phone);
          }else if(data['act'] == 2){
            //this.check_pin(phone);
          }
        })
      })
    }

    

  }

  

  show_discout(phone){
    /*console.log("" +  this.sum_dues_marketing.toFixed(2));
    console.log(this.sum_dues_team_promote.toFixed(2));
    console.log(this.sum_dues_promotion.toFixed(2));
    console.log(this.sum_dues_deduction.toFixed(2));
    console.log(this.cut_persent.toFixed(2));*/

    if(Number(this.no_dust) >  Number(this.data_qr_code[0]['qr_code_discount'])){
      const confirm = this.alertCtrl.create({
          title: 'กรุณายืนยันเพื่อทำรายการ',
          message: 'เมื่อทำรายการนี้ระบบจะหักเงินออกจาก Wallet เป็นจำนวนเงินสุทธิ : ' + this.total_discount.toFixed(2) + 'บาท',
          buttons: [
            {
              text: 'ยกเลิกรายการ',
              handler: () => {
                
              }
            },
            {
              text: 'ยืนยัน',
              handler: () => {
                var customer_id = this.data_qr_code[0].customer_id;
                var wallet_user = (Number(this.value_target) -  Number(this.discount));
                var wallet_customer = (Number(this.value_target) - Number(this.discount));
                //console.log(wallet_user,wallet_customer,this.discount,Number(this.value_target));
                this.insert_transfer_user_no_dues(wallet_user.toFixed(2),wallet_customer.toFixed(2),this.discount.toFixed(2),Number(this.value_target).toFixed(2),phone,customer_id,this.qr_code_id);
              }
            }
          ]
      });
      confirm.present();
    }else{
      const confirm = this.alertCtrl.create({
        title: 'กรุณายืนยันเพื่อทำรายการ',
        message: 'เมื่อทำรายการนี้ระบบจะหักเงินออกจาก Wallet เป็นจำนวนเงินสุทธิ : '+ this.total_discount.toFixed(2) +' บาท',
        buttons: [
          {
            text: 'ยกเลิกรายการ',
            handler: () => {
              
            }
          },
          {
            text: 'ยืนยัน',
            handler: () => {
              var customer_id = this.data_qr_code[0].customer_id;
              
              
              var wallet_user = this.total_discount;
              var wallet_customer = (Number(this.value_target) - Number(this.discount));

              this.insert_transfer_user(
                wallet_user.toFixed(2),wallet_customer.toFixed(2),this.discount.toFixed(2),this.cut_persent.toFixed(2),this.deduction.toFixed(2),this.value_target,
                this.sum_dues_marketing.toFixed(2),this.sum_dues_team_promote.toFixed(2),this.sum_dues_promotion.toFixed(2),this.sum_dues_deduction.toFixed(2),phone,customer_id,this.qr_code_id
              );
              //console.log(wallet_user.toFixed(2) + ' ' + wallet_customer.toFixed(2) + ' ' + this.discount.toFixed(2)  + ' '  +this.cut_persent.toFixed(2) + ' ' + this.deduction.toFixed(2)  + ' ' + this.value_target);
              //console.log(this.sum_dues_marketing.toFixed(2) + ' ' + this.sum_dues_team_promote.toFixed(2) + ' ' + this.sum_dues_promotion.toFixed(2) + ' ' + this.sum_dues_deduction.toFixed(2));
              //this.insert_transfer_user(cut_monney_user.toFixed(2),phone,customer_id,this.qr_code_id, this.cut_persent.toFixed(2) , this.deduction.toFixed(2),this.value_target)
              //this.insert_transfer_user(wallet_user.toFixed(2),wallet_customer.toFixed(2),this.discount.toFixed(2),this.cut_persent.toFixed(2),this.deduction.toFixed(2),this.value_target,this.sum_dues_marketing.toFixed(2),this.sum_dues_team_promote.toFixed(2),this.sum_dues_promotion.toFixed(2),this.sum_dues_deduction.toFixed(2),phone,customer_id,qr_code_id)
            }
          }
        ]
      });
      confirm.present();
    }
  }

  insert_transfer_user_no_dues(wallet_user,wallet_customer,discount,value_target,phone,customer_id,qr_code_id){
    //console.log(wallet_user + ' ' + wallet_customer + ' ' + discount + ' ' + value_target + ' ' + phone + ' ' + customer_id + ' ' + qr_code_id);
    this.apiServe.insert_transfer_user_no_dues(wallet_user,wallet_customer,discount,value_target,phone,customer_id,qr_code_id)
    .then((data) => {
      if(data['act'] == 1){
        this.alert_msg_insert_transfer_user(data['msg']);
      }else if(data['act'] == 2){
        this.alert_sucess_insert_transfer_user();
      }
    });
  }
  
  insert_transfer_user(wallet_user,wallet_customer,discount,cut_persent,deduction,value_target,sum_dues_marketing,sum_dues_team_promote,sum_dues_promotion,sum_dues_deduction,phone,customer_id,qr_code_id){
    this.apiServe.insert_transfer_user(wallet_user,wallet_customer,discount,cut_persent,deduction,value_target,sum_dues_marketing,sum_dues_team_promote,sum_dues_promotion,sum_dues_deduction,phone,customer_id,qr_code_id)
    .then((data) => {
      if(data['act'] == 1){
        this.alert_msg_insert_transfer_user(data['msg']);
      }else if(data['act'] == 2){
        this.alert_sucess_insert_transfer_user();
      }
    });
  }

  alert_msg_insert_transfer_user(msg){
    const confirm = this.alertCtrl.create({
      title: 'เกิดข้อผิดพลาด',
      message: msg ,
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            
          }
        },
      ]
    });
    confirm.present();
  }

  alert_sucess_insert_transfer_user(){
    const toast = this.toastCtrl.create({
      message: 'บันทึกข้อมูลสำเร็จ',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();

    setTimeout(() => {
      this.navCtrl.push(MainTabsPage);
      toast.dismiss();
    }, 1000);
  }

  
  insert_discount(){
      /*console.log(this.data_qr_code[0].qr_code_id)
      console.log(this.value_data[0].user_id)
      console.log(this.data_qr_code[0].customer_id)
      console.log(this.total_discount)
      console.log(this.data_qr_code[0].qr_code_discount)
      console.log(this.value_target)*/
      var qr_code_id = this.data_qr_code[0].qr_code_id
      var user_id = this.user_id;
      if(user_id == null){
        user_id = 134;
      }
      var customer_id = this.data_qr_code[0].customer_id
      //var total_discount = this.total_discount
      var qr_code_discount = this.data_qr_code[0].qr_code_discount
      var user_discount_value = this.value_target
      var msg = "ชำระเงินร้านค้า : " + this.customer_name ;
    
      /*var data_discount = [{
        'qr_code_id' : qr_code_id,
        'user_id' : user_id,
        'customer_id' : customer_id,
        'total_discount' : total_discount,
        'qr_code_discount' : discount,
        'user_discount_value' : value_data,
      }];*/
      
      

      if(user_discount_value == undefined){
        let alert = this.alertCtrl.create({
          title: 'เกิดข้อผิดพลาด!',
          subTitle: 'กรุณากรอกจำนวนเงิน',
          buttons: ['OK']
        });
        alert.present();
      }else{
        let confirm = this.alertCtrl.create({
          title: 'คุณแน่ใจหรือไม่ที่ต้องการจะทำรายการนี้?',
          message: 'รายการนี้จะถูกบันทึกลงในระบบ คุณแน่ใจหรือไม่ที่จะทำรายการนี้',
          buttons: [
            {
              text: 'ยืนยัน',
              handler: () => {
                /*var qr_code_active = 1;
                var discount_status = 1;
                //this.insert_qr_code_discount(qr_code_id,user_id,customer_id,total_discount,qr_code_discount,user_discount_value,qr_code_active,discount_status)*/
                
                this.insert_payment(qr_code_id,user_id,customer_id,qr_code_discount,user_discount_value,msg);
              }
            },
            {
              text: 'ยกเลิก',
              handler: () => {
                this.value_user = null;
                this.total_discount = 0;
              }
            }
          ]
        });
        confirm.present();
      }    
  }

  insert_payment(qr_code_id,user_id,customer_id,qr_code_discount,user_discount_value,msg){
    this.apiServe.insert_payment(qr_code_id,user_id,customer_id,qr_code_discount,user_discount_value,msg)
      .then((data) => {
        //console.log(data['msg'])
        var act = data['act'];
        var massage = data['msg'];
        var payment_log_id = data['data'];
        
        if(act != "2"){
          let alert = this.alertCtrl.create({
            title: 'เกิดข้อผิดพลาด!',
            subTitle: massage,
            buttons: ['OK']
          });
          alert.present();
        }else{

          this.data_user = this.UserService.User_data();
          this.data_user.then(result =>{
          //console.log(result[0])
          var phone = result[0].phone;
          this.apiServe.check_pin(phone)
          .then((data) => {
              if(data['act'] == 1){
                //this.insert_pin(phone,payment_log_id);
              }else if(data['act'] == 2){
                //this.check_pin(phone,payment_log_id);
              }
            })
          })
         
        }
      })
  }

  
  
  async open_web(payment_log_id){
    window.open('https://customer.discountpercent.com/api_2c2p/index/'+ payment_log_id,'_system', 'location=yes');
  }
  insert_qr_code_discount(qr_code_id,user_id,customer_id,total_discount,qr_code_discount,user_discount_value,qr_code_active,discount_status){
    this.apiServe.insert_user_discount(qr_code_id,user_id,customer_id,total_discount,qr_code_discount,user_discount_value,qr_code_active,discount_status)
      .then((data) => {
        //console.log(data['msg'])
        var act = data['act']
        var massage = data['msg']  
            
        if(act != 2){
          let alert = this.alertCtrl.create({
            title: 'เกิดข้อผิดพลาด!',
            subTitle: massage,
            buttons: ['OK']
          });
          alert.present();
        }else{
          let alert = this.alertCtrl.create({
            title: 'บันทึกข้อมูลเรียบร้อย',
            subTitle: massage,
            buttons: ['OK']
          });
          alert.present();

          this.get_main_page()
        }
      })
  }

  get_main_page(){
    this.navCtrl.push(MainTabsPage);
  }


  check_app(){
   

      this.data_user = this.UserService.User_data()
      this.data_user.then(result =>{
      //console.log(result[0])
      this.value_data = result;
      
      this.link_app()

    })

    //this.navCtrl.push(BankQrcodePage);
  }

  link_app(){
    var qr_code_id = this.data_qr_code[0].qr_code_id
    var user_id = this.value_data[0].user_id
    var customer_id = this.data_qr_code[0].customer_id
    var total_discount = this.total_discount
    var qr_code_discount = this.data_qr_code[0].qr_code_discount
    var user_discount_value = this.value_target

    if(user_discount_value == undefined){
      let alert = this.alertCtrl.create({
        title: 'เกิดข้อผิดพลาด!',
        subTitle: 'กรุณากรอกจำนวนเงิน',
        buttons: ['OK']
      });
      alert.present();
    }else{
      let confirm = this.alertCtrl.create({
        title: 'คุณแน่ใจหรือไม่ที่ต้องการจะทำรายการนี้?',
        message: 'รายการนี้จะถูกบันทึกลงในระบบ คุณแน่ใจหรือไม่ที่จะทำรายการนี้',
        buttons: [
          {
            text: 'ยืนยัน',
            handler: () => {
              this.push_page_bank_qrcode(qr_code_id,user_id,customer_id,total_discount,qr_code_discount,user_discount_value)
            }
          },
          {
            text: 'ยกเลิก',
            handler: () => {
              this.value_user = null;
              this.total_discount = 0;
            }
          }
        ]
      });
      confirm.present();
    }    
  }

  push_page_bank_qrcode(qr_code_id,user_id,customer_id,total_discount,qr_code_discount,user_discount_value){
    this.navCtrl.push(BankQrcodePage , {qr_code_id : qr_code_id,user_id : user_id,customer_id : customer_id,total_discount : total_discount,qr_code_discount : qr_code_discount,user_discount_value : user_discount_value});
    
  }
 

}
