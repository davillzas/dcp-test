import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrCodeDiscoutPage } from './qr-code-discout';

@NgModule({
  declarations: [
    QrCodeDiscoutPage,
  ],
  imports: [
    IonicPageModule.forChild(QrCodeDiscoutPage),
  ],
})
export class QrCodeDiscoutPageModule {}
