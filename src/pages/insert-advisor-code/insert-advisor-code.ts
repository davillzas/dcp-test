import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController , LoadingController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiProvider } from './../../providers/api/api';
import { UserService } from '../../services/user-service';
import {MainTabsPage} from '../main-tabs/main-tabs';
/**
 * Generated class for the InsertAdvisorCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-insert-advisor-code',
  templateUrl: 'insert-advisor-code.html',
})
export class InsertAdvisorCodePage {

  authForm: FormGroup;
  phone : any;
  uuid : any;

  constructor(public nav: NavController, public navParams: NavParams , public formBuilder: FormBuilder,public apiServe : ApiProvider
    ,public alertCtrl: AlertController ,  public UserService: UserService ,public loaddingCtrl : LoadingController
  ) {
    
    this.phone =  this.navParams.get('phone');
    this.uuid =  this.navParams.get('uuid');

    this.authForm = formBuilder.group({
      /*username: ['',Validators.compose([Validators.required])],*/
      //Password_data: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      phone_advisor_data: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
    });

  }

  onSubmit(value: any): void { 
    if(this.authForm.valid) {
    
      window.localStorage.setItem('phone_advisor_data', value.phone_advisor_data);

      var phone_advisor_data = value.phone_advisor_data;

      this.apiServe.check_advisor_code(phone_advisor_data).then((data) => {
        if(data['act'] == 1){
          let alert = this.alertCtrl.create({
            title: 'เกิดข้อผิดพลาด!',
            subTitle: data['msg'],
            buttons: ['OK']
          });
          alert.present();  
        }else if(data['act'] == 2){
          var phone =  this.phone;
          var uuid = this.uuid;
          this.apiServe.insert_user(phone,uuid,phone_advisor_data).then((data_insert_user) => {
            
            if(data_insert_user['act'] == 1){
              let alert = this.alertCtrl.create({
                title: 'เกิดข้อผิดพลาด!',
                subTitle: data_insert_user['msg'],
                buttons: ['OK']
              });
              alert.present();  
            }else if(data_insert_user['act'] == 2){

              this.apiServe.get_user(phone,uuid).then((data_get_user) => {
                
                this.UserService.Get_data(data_get_user['data']);

                let loading = this.loaddingCtrl.create({
                  content: 'กรุณารอสักครู่...'
                });
              
                loading.present();
                
                setTimeout(() => {
                  this.login();
                  loading.dismiss();
                }, 3000);
                
              })
            }
          });
        }
      });
    }
  }

  login() {
    // add your login code here
    this.nav.push(MainTabsPage);
  }
  

 

}
