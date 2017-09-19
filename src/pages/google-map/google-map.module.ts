import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoogleMapPage } from './google-map';
import { ListPage } from '../list/list';
@NgModule({
  declarations: [
    GoogleMapPage,
    ListPage
  ],
  imports: [
    IonicPageModule.forChild(GoogleMapPage),
  ],
})
export class GoogleMapPageModule {}
