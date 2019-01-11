import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserCheckPaymentPage } from './user-check-payment';

@NgModule({
  declarations: [
    UserCheckPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(UserCheckPaymentPage),
  ],
})
export class UserCheckPaymentPageModule {}
