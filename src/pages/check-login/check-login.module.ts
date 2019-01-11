import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckLoginPage } from './check-login';

@NgModule({
  declarations: [
    CheckLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckLoginPage),
  ],
})
export class CheckLoginPageModule {}
