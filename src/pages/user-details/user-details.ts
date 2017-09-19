import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Faction, User, Sector, TrailCoordinate, SnappedPoint, SPLocation } from "../../app/classes/classes";
/**
 * Generated class for the UserDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {
  levelProgress : string;
  user : User;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.user = {
      faction : 'blue',
      id: 1,
      crumbles: 300,
      email: "cwhite788@gmail.com",
      photons: 500,
      level: 3,
      sectors: new Array<Sector>(),
      trailCoordinates: new Array<TrailCoordinate>(),
      username: "Tronmac",
      icon: "https://image.flaticon.com/icons/png/512/33/33622.png" 
    };

    this.levelProgress = (this.user.photons/((this.user.level+1) * 1000))*100 +'%';
  }

}
