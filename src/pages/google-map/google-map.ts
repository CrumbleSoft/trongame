import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Faction, User, Sector, TrailCoordinate, SnappedPoint, SPLocation } from "../../app/classes/classes";
import { LocationsProvider } from "../../providers/locations/locations";
declare var google;

@IonicPage()
@Component({
  selector: 'page-google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  position: any;
  playerPos: any;
  user: User;
  checkCount: number = 0;
  status: string;

  pinkEnemyTrail: Array<Array<number>> = [
    [51.778744, 19.484092],
    [51.778106, 19.489768],
    [51.777761, 19.493909],
    [51.777044, 19.494059],
    [51.775889, 19.492600],
    [51.775703, 19.490647],
    [51.776831, 19.490068],
    [51.778066, 19.489810],
    [51.779898, 19.489403],
    [51.780349, 19.490862]
  ];

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private roadSmoothingProvider: LocationsProvider) { }



  ionViewDidLoad() {
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
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#212121"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#212121"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "administrative.neighborhood",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#181818"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1b1b1b"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#2c2c2c"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#8a8a8a"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#373737"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#3c3c3c"
              }
            ]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#4e4e4e"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#3d3d3d"
              }
            ]
          }
        ],
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_CENTER
        },
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, (err) => {
      console.log(err);
    });
  }

  addMarker() {
    this.geolocation.getCurrentPosition().then((position) => {
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
      });

      let content = "<h4>Information!</h4>";

      this.addInfoWindow(marker, content);
    }, (err) => {
      console.log(err);
    });
  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

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
      // this.generateTrail();
    }).catch((error) => {
      console.log(error);
    });
  }

  generateTrail() {
    let trail: Array<any> = new Array<any>();
    for (let coord of this.user.trailCoordinates) {
      trail.push(new google.maps.LatLng(coord.lat, coord.long));
    }

    let userTrail = new google.maps.Polyline({
      path: trail,
      geodesic: true,
      strokeColor: '#00fcff',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    userTrail.setMap(this.map);

    let enemyTrail: Array<any> = new Array<any>();
    for (let t of this.pinkEnemyTrail) {
      enemyTrail.push(new google.maps.LatLng(t[0], t[1]));
    }

    this.roadSmoothingProvider.alignToRoads(this.pinkEnemyTrail).then((result: { snappedPoints: Array<SnappedPoint> }) => {
      let enemyTrail: Array<any> = new Array<any>();
      enemyTrail = [];
      for (let sp of result.snappedPoints) {
        enemyTrail.push(new google.maps.LatLng(sp.location.latitude, sp.location.longitude));
      }


      let enemyPinkTrail = new google.maps.Polyline({
        path: enemyTrail,
        geodesic: true,
        strokeColor: '#ff00f6',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      enemyPinkTrail.setMap(this.map);
    }).catch((error) => {
      console.log(error);
    });


    //var polyline = L.polyline(trail, { color: '#00fcff' }).addTo(this.map);
    // zoom the map to the polyline
    //this.map.fitBounds(polyline.getBounds());

    // if (this.user.trailCoordinates.length > 0) {
    //   for (let tc of this.user.trailCoordinates) {

    //   }
    // }
    this.checkForIntersection();
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
    if (long && lat) {
      console.log(lat + "," + long);
      if (long <= largestLng && long >= smallestLat && lat <= largestLat && lat >= smallestLat) {
        //COLLISION!!!
        console.log("Collision Detected!!");
        return [lat, long];
      } else {
        //NO COLLISION
        console.log("No Collision Detected!!");
        return null;
      }
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
          sectorArray.push(new google.maps.LatLng(co.lat, co.long));
        }
      } else {
        sectorArray.push(new google.maps.LatLng(co.lat, co.long));
        if (co.lat == sectorEndPoint.lat && co.long == sectorEndPoint.long) {
          break;
        }
      }
    }

    this.map.addPolyline({
      color: "red",
      geodesic: true,
      points: sectorArray,
      visible: true,
      width: 5,
      zIndex: 100
    })
  }
}
