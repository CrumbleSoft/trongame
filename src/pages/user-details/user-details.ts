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

  levelProgress: string;
  user: User;

  userHs: Array<User> = new Array<User>();

  koen: User = {
    faction: 'red',
    id: 1,
    crumbles: 320,
    email: "koen@gmail.com",
    photons: 4280,
    level: 7,
    sectors: new Array<Sector>(),
    trailCoordinates: new Array<TrailCoordinate>(),
    trail: null,
    username: "NoeKoen",
    icon: "https://image.flaticon.com/icons/png/512/33/33622.png"
  };

  valentin: User = {
    faction: 'blue',
    id: 1,
    crumbles: 340,
    email: "valentin@gmail.com",
    photons: 3110,
    level: 8,
    sectors: new Array<Sector>(),
    trailCoordinates: new Array<TrailCoordinate>(),
    trail: null,
    username: "Valkyrie",
    icon: "https://image.flaticon.com/icons/png/512/33/33622.png"
  };

  cormac: User = {
    faction: 'green',
    id: 1,
    crumbles: 300,
    email: "cwhite788@gmail.com",
    photons: 500,
    level: 3,
    sectors: new Array<Sector>(),
    trailCoordinates: new Array<TrailCoordinate>(),
    trail: null,
    username: "Tronmac",
    icon: "https://image.flaticon.com/icons/png/512/33/33622.png"
  };

  barbara: User = {
    faction: 'pink',
    id: 1,
    crumbles: 560,
    email: "barbara@gmail.com",
    photons: 6070,
    level: 10,
    sectors: new Array<Sector>(),
    trailCoordinates: new Array<TrailCoordinate>(),
    trail: null,
    username: "Barbarosa",
    icon: "https://image.flaticon.com/icons/png/512/33/33622.png"
  };

  bor: User = {
    faction: 'yellow',
    id: 1,
    crumbles: 560,
    email: "bor@gmail.com",
    photons: 5070,
    level: 5,
    sectors: new Array<Sector>(),
    trailCoordinates: new Array<TrailCoordinate>(),
    trail: null,
    username: "TunelBore",
    icon: "https://image.flaticon.com/icons/png/512/33/33622.png"
  }


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.user = this.cormac;
    this.userHs = [this.barbara, this.bor, this.cormac, this.koen, this.valentin];
    this.userHs.sort((a, b) => {
      if (a.photons > b.photons)
        return 1;
      if (a.photons < b.photons)
        return 1;
      return 0;
    });
    this.levelProgress = (this.user.photons / ((this.user.level + 1) * 1000)) * 100 + '%';
  }

}
