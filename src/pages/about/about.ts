import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CmsAbout } from '../../providers/cms-about';
import { About } from '../../models/about';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
    news: About[]
    offset: number

  constructor(public navCtrl: NavController, public navParams: NavParams, public cmsNews: CmsAbout, private iab: InAppBrowser) {
    cmsNews.load(0).subscribe(news => {
    this.news = news;
    })
    this.offset = 0;
  }


  launch(url: string) {
      let browser = this.iab.create('https://cmsauto.com/' + url, '_blank', 'location=no, hidden=yes');

      browser.on('loadstop').subscribe((e)=>{
        browser.insertCSS({ code: "#top-header, .wrapper-sticky, #footer, #sidebar{display: none!important;}" });
      });
  }

}
