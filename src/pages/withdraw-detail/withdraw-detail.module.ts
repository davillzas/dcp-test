import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WithdrawDetailPage } from './withdraw-detail';

@NgModule({
  declarations: [
    WithdrawDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WithdrawDetailPage),
  ],
})
export class WithdrawDetailPageModule {}
