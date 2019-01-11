import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
declare var google: any;
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  public map: any;

  constructor(public nav: NavController, public platform: Platform) {
  }

  ionViewDidLoad() {
    // init map
    this.initializeMap();
  }

  initializeMap() {
    var minZoomLevel = 12;

    this.map = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: minZoomLevel,
      center: new google.maps.LatLng(38.50, -90.50),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  }
}
