import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,LoadingController, AlertController } from 'ionic-angular';
import { InspeccionesCrearPage } from '../inspecciones-crear/inspecciones-crear';

import { DynamoDB, User } from '../../providers/providers';
import { Modulo_1Page } from '../modulo-1/modulo-1';
import { isNumber } from 'ionic-angular/util/util';
import { AeropuertosPage } from '../aeropuertos/aeropuertos';

declare var AWS: any;

@Component({
  selector: 'page-inspecciones',
  templateUrl: 'inspecciones.html',
})
export class InspeccionesPage {


  public items: any;
  public item: any;

  //variable usada para traer datos del ATO seleccionado
  public itemsATO: any;
  public estaDesabilitado: boolean=true;
  public codigoATO: string;

  public refresher: any;
  public idAeropuerto: string;
  public nombreAeropuerto: string;
  private inspeccionesTable: string = 'appositran-mobilehub-1284814296-inspecciones';
  private aeropuertoTable: string = 'appositran-mobilehub-1284814296-aeropuertos';
  private moduloTable: string = 'appositran-mobilehub-1284814296-modulo1';


  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public user: User,
    public db: DynamoDB,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {

    this.idAeropuerto = navParams.get('idAeropuerto');
    this.nombreAeropuerto = navParams.get('nombreAeropuerto');

    var hoy = new Date();
    this.item = {
      'idATO': this.idAeropuerto,
      'idInspeccion': null,
      'idUsuario': AWS.config.credentials.identityId,
      'id': null,
      'created': hoy.getDate()+'/'+(hoy.getMonth()+1)+'/'+hoy.getFullYear()  //(new Date().getTime() / 1000)
    }
    this.getCodigoATO();
    this.refrescarInspecciones();
  }

  refreshData(refresher) {
    this.refresher = refresher;
    this.refrescarInspecciones()
  }

  regresarATO() {
    this.navCtrl.push(AeropuertosPage);  
  }

  showLoading() {
    this.loadingCtrl.create({
      duration: 1500,
      content: 'Guardando cambios ...'
    }).present();
  }

  refrescarInspecciones() {
    this.db.getDocumentClient().query({
      'TableName': this.inspeccionesTable,
      'KeyConditionExpression': "#idATO = :idATO AND #id >= :ident", //query expression
      'FilterExpression': "#estado = :estado", //filter expression
      'ExpressionAttributeNames': {
        '#idATO': 'idATO',
        '#id' : 'id',
        '#estado' : 'estado'
      },
      'ExpressionAttributeValues': {
        ':idATO': this.idAeropuerto,
        ':ident': 1,
        ':estado': 1 //solo devuelve los activos
      },
      'ScanIndexForward': false
    }).promise().then((data) => {
      this.items = data.Items;
      if (this.refresher) {
        this.refresher.complete();
      }
      this.estaDesabilitado = false;

    }).catch((err) => {
      console.log(err);
    });

  }


  getCodigoATO(){
    var codigo ='';
    this.db.getDocumentClient().query({
      'TableName': this.aeropuertoTable,
      'KeyConditionExpression': "#idATO = :idATO",
      'ExpressionAttributeNames': {
        '#idATO': 'idATO',
      },
      'ExpressionAttributeValues': {
        ':idATO': this.idAeropuerto
      },
      'ScanIndexForward': false
    }).promise().then((info) => {
      this.itemsATO = info.Items;   
    }).catch((err) => {
      console.log(err);
    });
  }

  agregarInspeccion() {
    console.log(this.itemsATO[0]);
    var fecha = new Date();
    //Creamos el codigo de la pre-inspeccion (PI-CODATO+AÑO+CORRELATIVO)
    this.codigoATO = 'PI-'+this.itemsATO[0].codigo +'-'+fecha.getFullYear()+'-'+this.itemsATO[0].correlativo;
    
    this.item.idInspeccion = this.codigoATO;
    this.item.estado = 1;
    this.item.id = this.itemsATO[0].correlativo;
    
    this.db.getDocumentClient().put({
      'TableName': this.inspeccionesTable,
      'Item': this.item,
      //'ConditionExpression': 'attribute_not_exists(idInspeccion)'
    }, (err, data) => {
      if (err) { console.log(err); }
    });

    this.mantenerCorrelativoATO(this.idAeropuerto,"suma");
    console.log(this.codigoATO)
    this.mostrarIDinpeccion();

    let pagina1 = this.navCtrl.push(Modulo_1Page, 
      { 
      'idInspeccion': this.codigoATO,
      'idAeropuerto': this.idAeropuerto,
      'id':this.itemsATO[0].correlativo,
      'nombreAeropuerto': this.nombreAeropuerto,
      'modoLectura':false
    });
  }

  mantenerCorrelativoATO(idAeropuerto,accion){
    
    var aux = (accion=="suma")?1:-1;
    
    //definimos itemATO que se actualizará la table en BD
    var itemATO ={
      'idATO': this.idAeropuerto,
      'descripcion' : this.nombreAeropuerto,
      'codigo': this.itemsATO[0].codigo,
      'correlativo': this.itemsATO[0].correlativo + aux
    }
    //Actualizamos el correlativo de acuerdo a la accion
    this.db.getDocumentClient().put({
      'TableName': this.aeropuertoTable,
      'Item': itemATO,
      'ConditionExpression': 'attribute_not_exists(id)'
    }, (err, data) => {
      if (err) { console.log(err); }
      this.refrescarInspecciones();
    });
  }

  mostrarIDinpeccion() {
    let alert = this.alertCtrl.create({
      title: 'Inspeccion creada',
      subTitle: 'Se ha creado su pre-inspección con código: '+this.codigoATO,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  ocultarInspeccion(item, index){
    var fecha = new Date();
    //Creamos el codigo de la pre-inspeccion (PI-CODATO+AÑO+CORRELATIVO)
    console.log("ya estamos en la funcion y vamos a eliminar");
    //console.log('idATO '+this.idAeropuerto + "   "+ ' idInspeccion '+this.idInspeccion)
    this.db.getDocumentClient().update({
      'TableName': this.inspeccionesTable,
      'Key':{
        'idATO' : item.idATO,
        'id': item.id
      },
      'UpdateExpression': "set #estado = :Eliminado",
      'ExpressionAttributeNames': {
        '#estado': 'estado',
      },
      'ExpressionAttributeValues':{
        ":Eliminado": 0
    },
    }, (err, data) => {
      if (err) { 
        console.log(err); 
      }
    });
    this.refrescarInspecciones()
  }

  getItemParaMostrar(item){
    console.log(item)
    var fecha = new Date();
    //Creamos el codigo de la pre-inspeccion (PI-CODATO+AÑO+CORRELATIVO)
    console.log("Vamos a recoger todos los datos del elemento para pintarlo");
    //console.log('idATO '+this.idAeropuerto + "   "+ ' idInspeccion '+this.idInspeccion)
    this.db.getDocumentClient().get({
      'TableName': this.moduloTable,
      'Key':{
        'idInspeccion' : item.idInspeccion,
      }
    }, (err, data) => {
      if (err) { 
        console.log("Error")
        console.log(err); 
      }
      else{
        //console.log(data)
        let pagina1 = this.navCtrl.push(Modulo_1Page, 
          { 
          'idInspeccion': item.idInspeccion,
          'idAeropuerto': this.idAeropuerto,
          'id':item.correlativo,
          'nombreAeropuerto': this.nombreAeropuerto,
          'modoLectura':true
        });

      }
    });
    
  }

}