import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { DynamoDB, User } from '../../providers/providers';
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

declare var AWS: any;

@Component({
  selector: 'page-inspecciones-crear',
  templateUrl: 'inspecciones-crear.html',
})


export class InspeccionesCrearPage {

  isReadyToSave: boolean;
  itemModulo: any;
  item: any;
  isAndroid: boolean;
  private moduloTable: string = 'appositran-mobilehub-1284814296-modulos';
  @Output() ionChange = new EventEmitter();


  public idInspeccion: string;
  public table: string;
  public idATO: string;
  public nombreAeropuerto: string;
  public hola: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public platform: Platform,
    public db: DynamoDB) {
    this.idInspeccion = navParams.get('idInspeccion');

    this.item ={
      'idInspeccion': this.idInspeccion
    }

    this.itemModulo = {
      'idInspeccion': this.idInspeccion,
      'cumplio1_1': true,
      'descripcion_1_1': null,
      'cumplio1_2': true,
      'descripcion_1_2': null,
      'cumplio1_3': true,
      'descripcion_1_3': null,
      'cumplio1_4': true,
      'descripcion_1_4': null,
      'cumplio1_5': true,
      'descripcion_1_5': null,
      'cumplio1_6': true,
      'descripcion_1_6': null,
      'cumplio1_7': true,
      'descripcion_1_7': null,
      'cumplio1_8': true,
      'descripcion_1_8': null,
      'cumplio1_9': true,
      'descripcion_1_9': null,
      'cumplio1_10': true,
      'descripcion_1_10': null,
      'cumplio1_11': true,
      'descripcion_1_11': null,
    };
    //this.abrirFormulario();
  }

  ngAfterViewInit() {
    // must wait for AfterViewInit if you want to modify the tabs instantly
    //this.superTabsCtrl.setBadge('homeTab', 5);
  }

  onTabSelect(ev: any) {
    console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
  }
  

  ionViewDidLoad() {

  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    console.log("guardar modulo")
    this.agregarModulo();
    this.viewCtrl.dismiss(this.item);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  ocultarToogle(idDescripcion: string) {
    switch (idDescripcion) {
      case '1': this.itemModulo.cumplio1_1 = !this.itemModulo.cumplio1_1; break;
      case '2': this.itemModulo.cumplio1_2 = !this.itemModulo.cumplio1_2; break;
      case '3': this.itemModulo.cumplio1_3 = !this.itemModulo.cumplio1_3; break;
      case '4': this.itemModulo.cumplio1_4 = !this.itemModulo.cumplio1_4; break;
      case '5': this.itemModulo.cumplio1_5 = !this.itemModulo.cumplio1_5; break;
      case '6': this.itemModulo.cumplio1_6 = !this.itemModulo.cumplio1_6; break;
      case '7': this.itemModulo.cumplio1_7 = !this.itemModulo.cumplio1_7; break;
      case '8': this.itemModulo.cumplio1_8 = !this.itemModulo.cumplio1_8; break;
      case '9': this.itemModulo.cumplio1_9 = !this.itemModulo.cumplio1_9; break;
      case '10': this.itemModulo.cumplio1_10 = !this.itemModulo.cumplio1_10; break;
      case '11': this.itemModulo.cumplio1_11 = !this.itemModulo.cumplio1_11; break;
    }
  }




  agregarModulo() {
    this.itemModulo.idInspeccion = this.idInspeccion;
    this.itemModulo.idModulo = '1';
    console.log(this.itemModulo);
    this.db.getDocumentClient().put({
      'TableName': this.moduloTable,
      'Item': this.itemModulo,
      'ConditionExpression': 'attribute_not_exists(this.idInspeccion)'
    }, (err, data) => {
      if (err) {
        console.log(err);
      }
      //this.refreshTasks();
    });
  }



}
