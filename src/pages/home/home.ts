import {Component, ViewChild} from '@angular/core';

import {IonicPage, NavController, NavParams} from 'ionic-angular';
// import {SuperTabsController} from "ionic2-super-tabs";
import {SuperTabsController } from 'ionic2-super-tabs';

import {SuperTabs} from 'ionic2-super-tabs';
import { Modulo_1Page } from '../modulo-1/modulo-1';
import { Modulo_2Page } from '../modulo-2/modulo-2';
import { Modulo_3Page } from '../modulo-3/modulo-3';
import { Modulo_4Page } from '../modulo-4/modulo-4';
import { Modulo_5Page } from '../modulo-5/modulo-5';
import { Modulo_6Page } from '../modulo-6/modulo-6';
import { Modulo_7Page } from '../modulo-7/modulo-7';
import { Modulo_8Page } from '../modulo-8/modulo-8';
import { Modulo_9Page } from '../modulo-9/modulo-9';
import { Modulo_10Page } from '../modulo-10/modulo-10';
import { Modulo_11Page } from '../modulo-11/modulo-11';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'home/:type'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild(SuperTabs) superTabs: SuperTabs;

  //paginas del tab
  page1: any = Modulo_1Page;
  page2: any = Modulo_2Page;
  page3: any = Modulo_3Page;
  page4: any = Modulo_4Page;
  page5: any = Modulo_5Page;
  page6: any = Modulo_6Page;
  page7: any = Modulo_7Page;
  page8: any = Modulo_8Page;
  page9: any = Modulo_9Page;
  page10: any = Modulo_10Page;
  page11: any = Modulo_11Page;

  showIcons: boolean = true;
  showTitles: boolean = true;
  pageTitle: string = 'Full Height';

  constructor(public navCtrl: NavController, private navParams: NavParams, private superTabsCtrl: SuperTabsController) {
    const type = navParams.get('type');
    switch (type) {
      case 'icons-only':
        this.showTitles = false;
        this.pageTitle += ' - Icons only';
        break;

      case 'titles-only':
        this.showIcons = false;
        this.pageTitle += ' - Titles only';
        break;
    }
  }

  ngAfterViewInit() {
    // this.superTabsCtrl.increaseBadge('page1', 10);
    // this.superTabsCtrl.enableTabSwipe('page3', false);
    // this.superTabsCtrl.enableTabsSwipe(false);
    // Test issue #122
    // setTimeout(() => {
    //   this.superTabs.slideTo(4);
    // }, 2000);
  }

  onTabSelect(tab: { index: number; id: string; }) {
    console.log(`Selected tab: `, tab);
  }

}
