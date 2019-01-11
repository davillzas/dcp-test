import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppBankPage } from './app-bank';

@NgModule({
  declarations: [
    AppBankPage,
  ],
  imports: [
    IonicPageModule.forChild(AppBankPage),
  ],
})
export class AppBankPageModule {}
