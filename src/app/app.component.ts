import {Component, ViewChild} from '@angular/core';
import { Nav, Config, Platform } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AeropuertosPage } from '../pages/aeropuertos/aeropuertos';

import { User } from '../providers/user';

import { InspeccionesPage } from "../pages/inspecciones/inspecciones";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Modulo_1Page } from '../pages/modulo-1/modulo-1';
import { Modulo_2Page } from '../pages/modulo-2/modulo-2';
import { HomePage } from '../pages/home/home';
import { TasksPage } from '../pages/tasks/tasks';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  rootParams: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, user: User, public config: Config) {

    let globalActions = function() {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    };

    platform.ready().then(() => {

      //splashScreen.hide();
      //statusBar.backgroundColorByHexString('#3949AB')

      
      user.isAuthenticated().then(() => {
        console.log('you are authenticated!');
        //this.rootPage = TabsPage;
        this.rootPage = AeropuertosPage;
        //this.rootPage = TasksPage;

        globalActions();
      }).catch(() => {
        console.log('you are not authenticated..'); 
        //this.rootPage = LoginPage;
        this.rootPage = AeropuertosPage;
        //this.rootPage = TasksPage;
        globalActions();
      });
      
    });
  }

  openPage(page) {
    this.nav.setRoot(page.page, page.params);
  }
}
