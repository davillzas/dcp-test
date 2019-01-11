import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WithdrawHistoryPage } from './withdraw-history';

@NgModule({
  declarations: [
    WithdrawHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(WithdrawHistoryPage),
  ],
})
export class WithdrawHistoryPageModule {}
