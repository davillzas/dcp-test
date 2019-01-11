import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankQrcodePage } from './bank-qrcode';

@NgModule({
  declarations: [
    BankQrcodePage,
  ],
  imports: [
    IonicPageModule.forChild(BankQrcodePage),
  ],
})
export class BankQrcodePageModule {}
