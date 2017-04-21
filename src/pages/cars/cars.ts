import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { CmsCars } from '../../providers/cms-cars';
import { Car } from '../../models/car';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-cars',
  templateUrl: 'cars.html'
})
export class CarsPage {
    cars: Car[]
    offset: number
    min: number
    max: number

  constructor(public navCtrl: NavController, public navParams: NavParams, public cmsCars: CmsCars, private iab: InAppBrowser, private loadingCtrl: LoadingController) {
    this.offset = 0;
    this.min = 0;
    this.max = 2900;
    cmsCars.load(this.offset, this.min, this.max).subscribe(cars => {
    this.cars = cars;
    })
  }

  loadMore(infiniteScroll) {
    console.log('Begin async operation');

    this.offset += 8;
    this.cmsCars.load(this.offset, this.min, this.max).subscribe(cars => {
      setTimeout(() => {
          for (let i of cars) {
            this.cars.push( i );
          }

          console.log('Async operation has ended');
          infiniteScroll.complete();
      }, 500);
    })
  }

  load() {
    this.offset = 0;
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
    loading.present();

    this.cmsCars.load(this.offset, this.min, this.max).subscribe(cars => {
      setTimeout(() => {
          this.cars = cars;
          loading.dismiss();
      }, 500);
    })
  }

  launch(url: string) {
      let browser = this.iab.create('https://cmsauto.com/exemple-de-vehicules-a-louer/' + url, '_blank', 'location=no, hidden=yes');

      browser.on('loadstop').subscribe((e)=>{
        browser.insertCSS({ code: "#top-header, .wrapper-sticky{display: none!important;" });
      });
  }
}
