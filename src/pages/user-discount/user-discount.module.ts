import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDiscountPage } from './user-discount';

@NgModule({
  declarations: [
    UserDiscountPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDiscountPage),
  ],
})
export class UserDiscountPageModule {}
