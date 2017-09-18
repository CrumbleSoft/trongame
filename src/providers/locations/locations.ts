import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LocationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationsProvider {

  constructor(public http: Http) { }

  data: any;
  lat: number;
  long: number;
  radius: number;
  coords: string;
  apiKey: string = "AIzaSyBEp9yeS73ZfBWISsD6piI_DLMwDQ5F3mo";

  getLocation(lat, lng) {
    this.coords
    this.radius = 500;

    return new Promise(resolve => {
      this.http.request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.coords + '&radius=' + this.radius + '&type=cafe&key=' + this.apiKey)
        .map(res => res.json()).subscribe(data => {
          console.log(data.results);
          this.data = data.results;

          resolve(this.data);
        });
    });
  }

  alignToRoads(points: Array<Array<number>>) {
    let path = "";
    let check = 1;
    for (let point of points) {
      path += point[0] + "," + point[1];
      if (check != points.length)
        path += "|";
      check++;
    }
    console.log(path);
    return new Promise(resolve => {
      this.http.request("https://roads.googleapis.com/v1/snapToRoads?path=" + path + "&interpolate=true" + "&key=" + this.apiKey)
        .map(res => res.json()).subscribe(data => {
          console.log(data);
          this.data = data;
          resolve(this.data);
        });
    });
  }
}