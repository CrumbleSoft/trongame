import { Component } from '@angular/core';

/**
 * Generated class for the MapPageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'map-page',
  templateUrl: 'map-page.html'
})
export class MapPageComponent {

  text: string;

  constructor() {
    console.log('Hello MapPageComponent Component');
    this.text = 'Hello World';
  }

}
