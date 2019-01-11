import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LinkAdvisorPage } from './link-advisor';

@NgModule({
  declarations: [
    LinkAdvisorPage,
  ],
  imports: [
    IonicPageModule.forChild(LinkAdvisorPage),
  ],
})
export class LinkAdvisorPageModule {}
