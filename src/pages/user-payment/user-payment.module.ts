import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPaymentPage } from './user-payment';

@NgModule({
  declarations: [
    UserPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(UserPaymentPage),
  ],
})
export class UserPaymentPageModule {}
