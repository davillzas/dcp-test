import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopupMobileQrcodePage } from './topup-mobile-qrcode';

@NgModule({
  declarations: [
    TopupMobileQrcodePage,
  ],
  imports: [
    IonicPageModule.forChild(TopupMobileQrcodePage),
  ],
})
export class TopupMobileQrcodePageModule {}
