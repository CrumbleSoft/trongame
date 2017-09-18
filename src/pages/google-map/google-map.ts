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

  pinkEnemyTrail: Array<{ lat: number, lng: number }> = [
    { lat: 51.778744, lng: 19.484092 },
    { lat: 51.778106, lng: 19.489768 },
    { lat: 51.777761, lng: 19.493909 },
    { lat: 51.777044, lng: 19.494059 },
    { lat: 51.775889, lng: 19.492600 },
    { lat: 51.775703, lng: 19.490647 },
    { lat: 51.776831, lng: 19.490068 },
    { lat: 51.778066, lng: 19.489810 },
    { lat: 51.779898, lng: 19.489403 },
    { lat: 51.780349, lng: 19.490862 }
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
          { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#263c3f' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b9a76' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca5b3' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#746855' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1f2835' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f3d19c' }]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#2f3948' }]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#515c6d' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#17263c' }]
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
      enemyTrail.push(new google.maps.LatLng(t.lat, t.lng));
    }

    let enemyPinkTrail = new google.maps.Polyline({
      path: enemyTrail,
      geodesic: true,
      strokeColor: '#ff00f6',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    enemyPinkTrail.setMap(this.map);

    //var polyline = L.polyline(trail, { color: '#00fcff' }).addTo(this.map);
    // zoom the map to the polyline
    //this.map.fitBounds(polyline.getBounds());

    // if (this.user.trailCoordinates.length > 0) {
    //   for (let tc of this.user.trailCoordinates) {

    //   }
    // }
    //this.checkForIntersection();
  }
}
