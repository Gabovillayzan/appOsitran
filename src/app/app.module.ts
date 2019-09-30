import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ConfirmPage } from '../pages/confirm/confirm';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { TabsPage } from '../pages/tabs/tabs';
import { TasksPage } from '../pages/tasks/tasks';
import { TasksCreatePage } from '../pages/tasks-create/tasks-create';
import { AeropuertosPage } from '../pages/aeropuertos/aeropuertos';
import { InspeccionesPage } from '../pages/inspecciones/inspecciones';
import { InspeccionesCrearPage } from '../pages/inspecciones-crear/inspecciones-crear';

import { SuperTabsModule } from 'ionic2-super-tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { User } from '../providers/user';
import { Cognito } from '../providers/aws.cognito';
import { DynamoDB } from '../providers/aws.dynamodb';
import { ComponentsModule } from '../components/components.module';


import { Modulo_10Page } from '../pages/modulo-10/modulo-10';
import { Modulo_1Page } from '../pages/modulo-1/modulo-1';
import { Modulo_2Page } from '../pages/modulo-2/modulo-2';
import { Modulo_3Page } from '../pages/modulo-3/modulo-3';
import { Modulo_4Page } from '../pages/modulo-4/modulo-4';
import { Modulo_5Page } from '../pages/modulo-5/modulo-5';
import { Modulo_6Page } from '../pages/modulo-6/modulo-6';
import { Modulo_7Page } from '../pages/modulo-7/modulo-7';
import { Modulo_8Page } from '../pages/modulo-8/modulo-8';
import { Modulo_9Page } from '../pages/modulo-9/modulo-9';
import { Modulo_11Page } from '../pages/modulo-11/modulo-11';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    ConfirmPage,
    SettingsPage,
    AboutPage,
    AccountPage,
    TabsPage,
    TasksPage,
    TasksCreatePage,
    HomePage,
    AeropuertosPage,
    InspeccionesPage,
    InspeccionesCrearPage,
    Modulo_1Page,
    Modulo_2Page,
    Modulo_3Page,
    Modulo_4Page,
    Modulo_5Page,
    Modulo_6Page,
    Modulo_7Page,
    Modulo_8Page,
    Modulo_9Page,
    Modulo_10Page,
    Modulo_11Page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    ConfirmPage,
    SettingsPage,
    AboutPage,
    AccountPage,
    TabsPage,
    TasksPage,
    TasksCreatePage,
    HomePage,
    AeropuertosPage,
    InspeccionesPage,
    InspeccionesCrearPage,
    Modulo_1Page,
    Modulo_2Page,
    Modulo_3Page,
    Modulo_4Page,
    Modulo_5Page,
    Modulo_6Page,
    Modulo_7Page,
    Modulo_8Page,
    Modulo_9Page,
    Modulo_10Page,
    Modulo_11Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    User,
    Cognito,
    DynamoDB
  ]
})
export class AppModule {}

declare var AWS;
AWS.config.customUserAgent = AWS.config.customUserAgent + ' Ionic';
