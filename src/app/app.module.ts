import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MapPage } from '../pages/map/map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocationsProvider } from '../providers/locations/locations';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationsProvider
  ]
})
export class AppModule {}
