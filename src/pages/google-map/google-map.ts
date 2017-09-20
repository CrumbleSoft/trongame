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
  userPos: { lat: number, lng: number };
  userTrail: Array<Array<number>> = [
    // [51.778135, 19.489866],
    // [51.777960, 19.491501],
    // [51.777792, 19.493433],
    // [51.777748, 19.494047],
    // [51.778379, 19.494018],
    [51.778882, 19.495110],
    [51.778590, 19.494214],
    [51.778570, 19.493970],
    [51.779551, 19.493736],
    [51.779417, 19.491996],
    [51.778796, 19.492135],
    [51.778823, 19.492956],
    [51.778890, 19.493884],
  ];
  user: User;
  checkCount: number = 0;
  status: string;

  testLine1: Array<Array<number>> = [
    [51.782850, 19.450064],
    [51.775932, 19.452188]
  ];

  testLine2: Array<Array<number>> = [
    [51.776251, 19.448540],
    [51.776696, 19.453958]
  ]

  pinkEnemyTrail: Array<Array<number>> = [
    [51.780349, 19.490862],
    [51.779898, 19.489403],
    [51.778066, 19.489810],
    [51.776831, 19.490068],
    [51.775703, 19.490647],
    [51.775889, 19.492600],
    [51.777044, 19.494059],
    [51.777761, 19.493909],
    [51.778106, 19.489768],
    [51.778744, 19.484092]
  ];

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private roadSmoothingProvider: LocationsProvider) { }

  ionViewDidLoad() {
    this.user = {
      id: 1,
      faction: 'blue',
      crumbles: 300,
      email: "cwhite788@gmail.com",
      photons: 3320,
      level: 3,
      sectors: new Array<Sector>(),
      trailCoordinates: new Array<TrailCoordinate>(),
      trail : null,
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
                "color": "#1d2c4d"
              }
            ]
          },
          {
            "elementType": "labels",
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
                "color": "#8ec3b9"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1a3646"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#4b6878"
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
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#64779e"
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
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#4b6878"
              }
            ]
          },
          {
            "featureType": "landscape.man_made",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#334e87"
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#023e58"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#283d6a"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#6f9ba5"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1d2c4d"
              }
            ]
          },
          {
            "featureType": "poi.business",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#023e58"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#3C7680"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#304a7d"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.icon",
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
                "color": "#98a5be"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1d2c4d"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#2c6675"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#255763"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#b0d5ce"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#023e58"
              }
            ]
          },
          {
            "featureType": "transit",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#98a5be"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1d2c4d"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#283d6a"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#3a4762"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#0e1626"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#4e6d70"
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
      this.updatePlayerMarker();
    }, (err) => {
      console.log(err);
    });
  }

  testCollision() {
    let currentCoord = this.user.trailCoordinates[this.user.trailCoordinates.length - 1];
    let index = 0;
    let sector = null;
    let polyLine: Array<{ lat: number, lng: number }> = new Array<{ lat: number, lng: number }>();

    console.log(this.user.trailCoordinates.length);
    for (let i = this.user.trailCoordinates.length - 5; i >= 0; i--) {
      let dist = this.getDistance({ lat: currentCoord.lat, lng: currentCoord.long }, { lat: this.user.trailCoordinates[i].lat, lng: this.user.trailCoordinates[i].long });
      polyLine.push({ lat: this.user.trailCoordinates[i].lat, lng: this.user.trailCoordinates[i].long });
      console.log(dist);
      if (dist < 40) {
        console.log(dist + ", connect");
        sector = new google.maps.Polygon({
          paths: polyLine,
          strokeColor: '#00fcff',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: '#00fcff',
          fillOpacity: 0.35
        });
        break;
      }
    }
    console.log(sector);
    if (sector != null)
      sector.setMap(this.map);
  }

  updatePlayerMarker() {
    let watchOptions = {
      frequency: 1000,
      timeout: 3000,
      enableHighAccuracy: false
    };


    this.geolocation.watchPosition().subscribe((position) => {
      //check distance between new coordinate and this.playerPos
      //if distance greater than 30 meters
      if (!this.playerPos) {
        this.userPos = { lat: position.coords.latitude, lng: position.coords.longitude };
        this.playerPos = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.Drop,
          position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        });
      } else {
        this.transition([position.coords.latitude, position.coords.longitude]);
        this.addTrailSegment(position);
        //this.playerPos.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      }
    }, (error) => {
      console.log('Error getting location', error);
    });
  }

  addTrailSegment(position) {
    
  }

  numDeltas = 100;
  delay = 10; //milliseconds
  i = 0;
  deltaLat;
  deltaLng;

  transition(result) {
    this.i = 0;
    this.deltaLat = (result[0] - this.userPos.lat) / this.numDeltas;
    this.deltaLng = (result[1] - this.userPos.lng) / this.numDeltas;
    this.moveMarker();
  }

  moveMarker() {
    if (this.userPos) {
      this.userPos.lat += this.deltaLat;
      this.userPos.lng += this.deltaLng;
      var latlng = new google.maps.LatLng(this.userPos.lat, this.userPos.lng);
      if (this.playerPos) {
        this.playerPos.setPosition(latlng);
        if (this.i != this.numDeltas) {
          this.i++;
          setTimeout(this.moveMarker, this.delay);
        }
      }
    }
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

    let userOldTrail = new google.maps.Polyline({
      path: this.userTrail,
      geodesic: true,
      strokeColor: '#ffffff',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    userOldTrail.setMap(this.map);

    this.roadSmoothingProvider.alignToRoads(this.userTrail).then((result: { snappedPoints: Array<SnappedPoint> }) => {
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
    let newPoint: any;
    for (let coord of this.user.trailCoordinates) {
      trail.push(new google.maps.LatLng(coord.lat, coord.long));
      // newPoint = new google.maps.Marker({
      //   map: this.map,
      //   animation: google.maps.Animation.Drop,
      //   position: new google.maps.LatLng(coord.lat, coord.long)
      // });
    }

    let userTrail = new google.maps.Polyline({
      path: trail,
      geodesic: true,
      strokeColor: '#00fcff',
      strokeOpacity: 1.0,
      strokeWeight: 10
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
    this.testCollision();


    //this.checkForIntersection();
  }

  checkForIntersection() {
    let vectors: Array<any> = [];
    let trailPoints: Array<TrailCoordinate> = new Array<TrailCoordinate>();
    for (let ut of this.userTrail) {
      trailPoints.push({
        active: true,
        id: 1,
        lat: ut[0],
        long: ut[1],
        strength: 5,
        timeStamp: new Date()
      });
    }
    for (let i = 0; i < trailPoints.length - 1; i++) {
      vectors.push({
        start: trailPoints[i],
        end: trailPoints[i + 1],
        slope: (trailPoints[i + 1].long - trailPoints[i].long) / (trailPoints[i + 1].lat - trailPoints[i].lat)
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
            this.user.trailCoordinates = new Array<TrailCoordinate>();
          }
        }
        indexNext++;
      }
      indexCurrent++;
    }
  }


  rad(x) {
    return x * Math.PI / 180;
  };

  getDistance(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = this.rad(p2.lat - p1.lat);
    var dLong = this.rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  };

  checkForCollision(currentVector: { start: any, end: any }, nextVector: { start: any, end: any }): Array<number> {
    let delta: number = 100;
    let currentSlope: number = (currentVector.end.lng() - currentVector.start.lng()) / (currentVector.end.lat() - currentVector.start.lat());
    let nextSlope: number = (nextVector.end.lng() - nextVector.start.lng()) / (nextVector.end.lat() - nextVector.start.lat());

    let c1 = currentVector.start.lng() - (currentSlope * currentVector.start.lat());
    let c2 = nextVector.start.lng() - (nextSlope * nextVector.start.lat());

    let long = (currentSlope * currentVector.start.lat() + c1) - (nextSlope * nextVector.start.lat() + c2);
    let lat = (long - c1) / currentSlope;
    // console.log(currentVector);

    // // console.log(currentVector.slope);
    // console.log(currentVector.start.lat);
    // console.log(c1);
    // console.log(nextVector.slope);
    // console.log(nextVector.start.lat);
    // console.log(c2);

    if (long && lat) {
      console.log(lat + "," + long);
      let point = this.onSegment(currentVector, [lat, long]);
      if (point) {
        //COLLISION!!!
        console.log("Collision Detected!!");
        return point;
      } else {
        //NO COLLISION
        console.log("No Collision Detected!!");
        return null;
      }
    }
  }

  onSegment(line: { start: any, end: any }, point: Array<number>) {
    if (point[0] > 51.7 && point[0] < 51.8) {
      console.log(point);
      console.log(line);
    }
    if (point[0] <= this.max(line.start.lat(), line.end.lat())
      && point[0] >= this.min(line.start.lat(), line.end.lat())
      && point[1] <= this.max(line.start.lng(), line.end.lng())
      && point[1] >= this.min(line.start.lng(), line.end.lng())) {
      console.log("TEST");
      return point;
    }
    return null;
  }

  max(n1, n2): number {
    if (n1 >= n2)
      return n1
    else
      return n2;
  }

  min(n1, n2): number {
    if (n1 <= n2)
      return n1
    else
      return n2;
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

    // this.map.addPolyline({
    //   color: "red",
    //   geodesic: true,
    //   points: sectorArray,
    //   visible: true,
    //   width: 5,
    //   zIndex: 100
    // })
  }
}
