import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  selectedItemId = -1;
  icons: string[];
  items: Array<{ id: number, title: string, note: string, icon: string, content: string, previousPhoton: number, photonChange: number }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    if (this.selectedItem)
      this.selectedItemId = this.selectedItem.id;

    // Let's populate this page with some filler content for funzies
    this.icons = ['flash', 'git-merge', 'git-compare'];

    this.items = [];
    this.items.push({
      id: 1,
      title: 'Collision!',
      note: ' 9:15am 21/09/2017',
      icon: this.icons[1],
      content: "You collided with Paddy95's trail. You broke through! +20ph",
      previousPhoton: 3300,
      photonChange: 20
    });

    this.items.push({
      id: 2,
      title: 'Sector Created!',
      note: ' 8:35am 21/09/2017',
      icon: this.icons[2],
      content: 'Successfully created a new sector! +300ph',
      previousPhoton: 3000,
      photonChange: 300
    });

    this.items.push({
      id: 3,
      title: 'Covered 500m! Cycle bonus',
      note: ' 7:22pm 20/09/2017',
      icon: this.icons[0],
      content: 'You covered 500m! Only 3750m more until your next Achievement.',
      previousPhoton: 3000,
      photonChange: 0
    });
  }

  itemTapped(event, item) {
    this.selectedItemId = item.id;
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
