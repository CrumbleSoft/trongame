import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import L from "leaflet";
import Tangram from "tangram";
import { Faction, User, Sector, TrailCoordinate, SnappedPoint, SPLocation } from "../../app/classes/classes";
import { LocationsProvider } from "../../providers/locations/locations";
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  map: L.Map;
  center: L.PointTuple;
  position: any;
  playerPos: any;
  user: User;
  trailIcon: any;
  checkCount: number = 0;
  status: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public roadSmoothingProvider: LocationsProvider) {
  }

  ionViewDidLoad() {
    this.status = "Building Map";
    this.initMap();



    this.trailIcon = L.icon({
      iconUrl: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/glowing-purple-neon-icons-symbols-shapes/114371-glowing-purple-neon-icon-symbols-shapes-shapes-circle-clear.png',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowUrl: 'my-icon-shadow.png',
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
    });
    this.user = {
      id: 1,
      crumbles: 300,
      email: "cwhite788@gmail.com",
      energon: 25000,
      level: 3,
      sectors: new Array<Sector>(),
      trailCoordinates: new Array<TrailCoordinate>(),
      username: "Tronmac",
      icon: "https://image.flaticon.com/icons/png/512/33/33622.png"
    };

    this.generateFakeTrail();
  }

  // onSuccess Callback
  // This method accepts a Position object, which contains the
  // current GPS coordinates
  //
  onSuccess(position) {
    if (this.center) {
      this.initMap();
    } else {
      alert("FAIL");
    }
    return [position.coords.latitude, position.coords.longitude];
    // this.initMap();
  }

  // onError Callback receives a PositionError object
  //
  onError(error) {
    alert('code: ' + error.code + '\n' +
      'message: ' + error.message + '\n');
    //this.initMap();
    return null;
  }

  initMap() {
    let self = this;
    console.log("TEST");
    this.geolocation.getCurrentPosition().then((position) => {
      this.status = "Map Built";
      this.buildMap(position);
      setInterval(function () {
        this.checkCount++;
        self.updatePosition();
      }, 500);
    }, (err) => {
      console.log("FAIL");
      console.log(err);
    });
  }

  buildMap(position: any) {
    this.map = L.map('map', {
      center: [position.coords.latitude, position.coords.longitude],
      zoom: 13
    });

    var osm = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
      maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attribution">CARTO</a>'
    });
    this.map.addLayer(osm);

    // let layer = Tangram.leafletLayer({
    //   scene: 'https://tangrams.github.io/tron-style/tron-style.yaml'
    // });

    // L.tileLayer(layer).addTo(this.map);

    //Add OSM Layer
    // L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);

    this.updateMarker(position);

  }

  updatePosition() {
    this.geolocation.getCurrentPosition().then((position) => {
      if (this.positionHasChanged(position)) {
        this.updateMarker(position);
        this.status = "Moving...";
      }
      else
        this.status = "Not Moving";
    }, (err) => {
      console.log(err);
    });
  }

  positionHasChanged(position): boolean {
    if (this.user.trailCoordinates[this.user.trailCoordinates.length - 1].lat - position.coords.latitude == 0 && this.user.trailCoordinates[this.user.trailCoordinates.length - 1].long - position.coords.longitude == 0) {
      //lat and long is the same
      return false;
    }
    return true;
  }

  updateMarker(position) {
    if (!this.playerPos) {
      this.playerPos = [position.coords.latitude, position.coords.longitude];
      L.marker(this.playerPos).addTo(this.map);
    } else
      this.playerPos = [position.coords.latitude, position.coords.longitude];

    let newtrailCoordinate = {
      id: 1,
      active: true,
      lat: position.coords.latitude,
      long: position.coords.longitude,
      strength: 0.5 * this.user.level,
      timeStamp: new Date()
    };
    //this.user.trailCoordinates.push(newtrailCoordinate);
    console.log(newtrailCoordinate);
  }

  generateFakeTrail() {
    let trail = [
      [51.778135, 19.489866],
      [51.777960, 19.491501],
      [51.777792, 19.493433],
      [51.777748, 19.494047],
      [51.778379, 19.494018],
      [51.778890, 19.493884],
      [51.778823, 19.492956],
      [51.778796, 19.492135],
      [51.779417, 19.491996],
      [51.779551, 19.493736],
      [51.778570, 19.493970],
      [51.778590, 19.494214],
      [51.778882, 19.495110],
    ];

    this.roadSmoothingProvider.alignToRoads(trail).then((result: { snappedPoints: Array<SnappedPoint> }) => {
      let snappedPoints: Array<SnappedPoint> = result.snappedPoints;
      for (let sp of snappedPoints) {
        let newtrailCoordinate = {
          id: 1,
          active: true,
          lat: sp.location.latitude,
          long: sp.location.longitude,
          strength: 0.5 * this.user.level,
          timeStamp: new Date()
        };
        this.user.trailCoordinates.push(newtrailCoordinate);
      }
    }).catch((error) => {
      console.log(error);
    });

    // for (let t of trail) {
    //   let newtrailCoordinate = {
    //     id: 1,
    //     active: true,
    //     lat: t[0],
    //     long: t[1],
    //     strength: 0.5 * this.user.level,
    //     timeStamp: new Date()
    //   };
    //   this.user.trailCoordinates.push(newtrailCoordinate);
    // }
  }

  getPolyLines(): Array<{ start: TrailCoordinate; end: TrailCoordinate; slope: number }> {
    let vectors: Array<{ start: TrailCoordinate; end: TrailCoordinate; slope: number }> = null;
    for (let i = 0; i < this.user.trailCoordinates.length - 1; i++) {
      vectors.push({
        start: this.user.trailCoordinates[i],
        end: this.user.trailCoordinates[i + 1],
        slope: (this.user.trailCoordinates[i + 1].long - this.user.trailCoordinates[i].long) / (this.user.trailCoordinates[i + 1].lat - this.user.trailCoordinates[i].lat)
      });
    }
    return vectors;
  }

  generateTrail() {
    // let trail = [
    //   [51.778135, 19.489866],
    //   [51.777960, 19.491501],
    //   [51.777792, 19.493433],
    //   [51.777748, 19.494047],
    //   [51.778379, 19.494018],
    //   [51.778890, 19.493884],
    //   [51.778823, 19.492956],
    //   [51.778796, 19.492135],
    //   [51.779417, 19.491996],
    //   [51.779551, 19.493736],
    //   [51.778570, 19.493970],
    //   [51.778590, 19.494214],
    //   [51.778882, 19.495110]
    // ];

    let trail: Array<Array<number>> = new Array<Array<number>>();
    for (let coord of this.user.trailCoordinates) {
      trail.push([coord.lat, coord.long]);
    }

    var polyline = L.polyline(trail, { color: '#00fcff' }).addTo(this.map);
    // zoom the map to the polyline
    this.map.fitBounds(polyline.getBounds());

    // if (this.user.trailCoordinates.length > 0) {
    //   for (let tc of this.user.trailCoordinates) {

    //   }
    // }
    this.checkForIntersection();
  }

  generateBikeStations() {
    //TODO - Import BikeStations or pull from Firebase
  }

  checkForIntersection() {
    let vectors: Array<any> = [];

    for (let i = 0; i < this.user.trailCoordinates.length - 1; i++) {
      vectors.push({
        start: this.user.trailCoordinates[i],
        end: this.user.trailCoordinates[i + 1],
        slope: (this.user.trailCoordinates[i + 1].long - this.user.trailCoordinates[i].long) / (this.user.trailCoordinates[i + 1].lat - this.user.trailCoordinates[i].lat)
      });
    }

    let indexCurrent: number = 0, indexNext: number = 0, collisionPoint: Array<number> = null;
    for (let currentVector of vectors) {
      indexNext = 0;
      for (let nextVector of vectors) {
        if (indexCurrent != indexNext) {
          collisionPoint = this.checkForCollision(currentVector, nextVector);
          if (collisionPoint) {
            //make Sector
            this.createSector(collisionPoint, currentVector.end, nextVector.start);
          }
        }
        indexNext++;
      }
      indexCurrent++;
    }
  }

  checkForCollision(currentVector, nextVector): Array<number> {
    let c1 = currentVector.start.long - (currentVector.slope * currentVector.start.lat);
    let c2 = nextVector.start.long - (nextVector.slope * nextVector.start.lat);

    let long = (currentVector.slope * currentVector.start.lat + c1) - (nextVector.slope * nextVector.start.lat + c2);
    let lat = (long - c1) / currentVector.slope;
    let largestLat = this.getLargestLat(currentVector, nextVector), smallestLat = this.getSmallestLat(currentVector, nextVector), largestLng = this.getLargestLng(currentVector, nextVector), sallestLng = this.getSmallestLng(currentVector, nextVector);

    if (long <= largestLng && long >= smallestLat && lat <= largestLat && lat >= smallestLat) {
      //COLLISION!!!
      return [lat, long];
    } else {
      //NO COLLISION
      return null;
    }
  }

  getLargestLat(currentVector, nextVector): number {
    if (currentVector.start.lat > currentVector.end.lat) {
      if (currentVector.start.lat > nextVector.start.lat) {
        if (currentVector.start.lat > nextVector.end.lat)
          return currentVector.start.lat;
        else
          return nextVector.end.lat;
      } else {
        if (nextVector.start.lat > nextVector.end.lat)
          return nextVector.start.lat;
        else
          return nextVector.end.lat;
      }
    } else {
      if (currentVector.end.lat > nextVector.start.lat) {
        if (currentVector.end.lat > nextVector.end.lat)
          return currentVector.end.lat;
        else
          return nextVector.end.lat;
      } else {
        if (nextVector.start.lat > nextVector.end.lat)
          return nextVector.start.lat;
        else
          return nextVector.end.lat;
      }
    }
  }

  getSmallestLat(currentVector, nextVector): number {
    if (currentVector.start.lat < currentVector.end.lat) {
      if (currentVector.start.lat < nextVector.start.lat) {
        if (currentVector.start.lat < nextVector.end.lat)
          return currentVector.start.lat;
        else
          return nextVector.end.lat;
      } else {
        if (nextVector.start.lat < nextVector.end.lat)
          return nextVector.start.lat;
        else
          return nextVector.end.lat;
      }
    } else {
      if (currentVector.end.lat < nextVector.start.lat) {
        if (currentVector.end.lat < nextVector.end.lat)
          return currentVector.end.lat;
        else
          return nextVector.end.lat;
      } else {
        if (nextVector.start.lat < nextVector.end.lat)
          return nextVector.start.lat;
        else
          return nextVector.end.lat;
      }
    }
  }

  getLargestLng(currentVector, nextVector): number {
    if (currentVector.start.long > currentVector.end.long) {
      if (currentVector.start.long > nextVector.start.long) {
        if (currentVector.start.long > nextVector.end.long)
          return currentVector.start.long;
        else
          return nextVector.end.long;
      } else {
        if (nextVector.start.long > nextVector.end.long)
          return nextVector.start.long;
        else
          return nextVector.end.long;
      }
    } else {
      if (currentVector.end.long > nextVector.start.long) {
        if (currentVector.end.long > nextVector.end.long)
          return currentVector.end.long;
        else
          return nextVector.end.long;
      } else {
        if (nextVector.start.long > nextVector.end.long)
          return nextVector.start.long;
        else
          return nextVector.end.long;
      }
    }
  }

  getSmallestLng(currentVector, nextVector): number {
    if (currentVector.start.long < currentVector.end.long) {
      if (currentVector.start.long < nextVector.start.long) {
        if (currentVector.start.long < nextVector.end.long)
          return currentVector.start.long;
        else
          return nextVector.end.long;
      } else {
        if (nextVector.start.long < nextVector.end.long)
          return nextVector.start.long;
        else
          return nextVector.end.long;
      }
    } else {
      if (currentVector.end.long < nextVector.start.long) {
        if (currentVector.end.long < nextVector.end.long)
          return currentVector.end.long;
        else
          return nextVector.end.long;
      } else {
        if (nextVector.start.long < nextVector.end.long)
          return nextVector.start.long;
        else
          return nextVector.end.long;
      }
    }
  }

  createSector(collisionPoint, sectorStartPoint, sectorEndPoint) {
    let sectorArray: Array<any> = new Array<any>();
    sectorArray.push(collisionPoint);
    let hasStarted: boolean = false;
    for (let co of this.user.trailCoordinates) {
      if (!hasStarted) {
        if (co.lat == sectorStartPoint.lat && co.long == sectorStartPoint.long) {
          hasStarted = true;
          sectorArray.push([co.lat,co.long]);
        }
      } else {
        sectorArray.push([co.lat,co.long]);
        if(co.lat == sectorEndPoint.lat && co.long == sectorEndPoint.long) {
          break;
        }
      }
    }

    var polygon = L.polygon(sectorArray, {color: 'red'}).addTo(this.map);
    // zoom the map to the polygon
    this.map.fitBounds(polygon.getBounds());
  }
}

