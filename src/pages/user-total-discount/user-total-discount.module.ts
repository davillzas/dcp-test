import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserTotalDiscountPage } from './user-total-discount';

@NgModule({
  declarations: [
    UserTotalDiscountPage,
  ],
  imports: [
    IonicPageModule.forChild(UserTotalDiscountPage),
  ],
})
export class UserTotalDiscountPageModule {}
