import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanQrcodePage } from './scan-qrcode';

@NgModule({
  declarations: [
    ScanQrcodePage,
  ],
  imports: [
    IonicPageModule.forChild(ScanQrcodePage),
  ],
})
export class ScanQrcodePageModule {}
