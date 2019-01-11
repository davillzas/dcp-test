import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerPicPage } from './customer-pic';

@NgModule({
  declarations: [
    CustomerPicPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerPicPage),
  ],
})
export class CustomerPicPageModule {}
