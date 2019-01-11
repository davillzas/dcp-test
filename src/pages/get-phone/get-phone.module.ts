import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetPhonePage } from './get-phone';

@NgModule({
  declarations: [
    GetPhonePage,
  ],
  imports: [
    IonicPageModule.forChild(GetPhonePage),
  ],
})
export class GetPhonePageModule {}
