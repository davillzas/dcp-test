import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ReviewService} from '../../services/review-service';
import {PlaceDetailPage} from '../place-detail/place-detail';

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {
  public reviews: any;

  constructor(public nav: NavController, public reviewService: ReviewService) {
    // feed
    this.reviews = reviewService.getAll();
  }

  // view a place
  viewPlace(id) {
    this.nav.push(PlaceDetailPage, {id: id});
  }
}
