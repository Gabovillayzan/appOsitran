import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, LoadingController, AlertController } from 'ionic-angular';
import { DynamoDB, User } from '../../providers/providers';
import { Modulo_3Page } from '../modulo-3/modulo-3';
import { Modulo_1Page } from '../modulo-1/modulo-1';
import { InspeccionesPage } from '../inspecciones/inspecciones';

@Component({
  selector: 'page-modulo-2',
  templateUrl: 'modulo-2.html',
})
export class Modulo_2Page {

  //declaración de vaiables a usar
  itemInspeccion: any;
  id: any;
  itemModulo: any;
  itemModuloAux: any;
  item: any;
  modoLectura: any;
  correlativo: any;
  isAndroid: boolean;
  pagina2: Modulo_2Page;

  //declaracion de variables Nav
  public idInspeccion: string;
  public nombreAeropuerto: string;
  public idAeropuerto: string;

  //definicion de tablas a consultar
  private aeropuertoTable: string = 'appositran-mobilehub-1284814296-aeropuertos';
  private inspeccionesTable: string = 'appositran-mobilehub-1284814296-inspecciones';
  private moduloTable: string = 'appositran-mobilehub-1284814296-modulo';

  //declaracion de variable Output
  @Output() ionChange = new EventEmitter();

  //definicion del constructor con los controller a usar
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public platform: Platform,
    public db: DynamoDB,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {

    //recibimos los parametros desde el modulo que envia para
    //guardar o desde el modulo de aeropuertos
    this.idInspeccion = navParams.get('idInspeccion');
    this.idAeropuerto = navParams.get('idAeropuerto');
    this.id = navParams.get('id');
    this.nombreAeropuerto = navParams.get('nombreAeropuerto');
    this.modoLectura = navParams.get('modoLectura');

    console.log(this.modoLectura);

    //definimos itemModulo para enviar datos a AWS
    this.itemModulo = {
      'idInspeccion': this.idInspeccion,
      'cumplio2_1': true,
      'descripcion_2_1': null,
      'cumplio2_2': true,
      'descripcion_2_2': null,
      'cumplio2_3': true,
      'descripcion_2_3': null,
      'cumplio2_4': true,
      'descripcion_2_4': null,
      'cumplio2_5': true,
      'descripcion_2_5': null,
      'cumplio2_6': true,
      'descripcion_2_6': null,
      'cumplio2_7': true,
      'descripcion_2_7': null,
      'cumplio2_8': true,
      'descripcion_2_8': null,
      'cumplio2_9': true,
      'descripcion_2_9': null,
      'cumplio2_10': true,
      'descripcion_2_10': null,
      'cumplio2_11': true,
      'descripcion_2_11': null,
      'cumplio2_12': true,
      'descripcion_2_12': null,
      'cumplio2_13': true,
      'descripcion_2_13': null,
      'cumplio2_14': true,
      'descripcion_2_14': null,
      'cumplio2_15': true,
      'descripcion_2_15': null,
      'cumplio2_16': true,
      'descripcion_2_16': null,
      'cumplio2_17': true,
      'descripcion_2_17': null,
      'cumplio2_18': true,
      'descripcion_2_18': null,
      'cumplio2_19': true,
      'descripcion_2_19': null,
      'cumplio2_20': true,
      'descripcion_2_20': null,
      'cumplio2_21': true,
      'descripcion_2_21': null
    };

    this.getModulo(2);
    console.log(this.itemModuloAux)

    if (this.modoLectura && this.itemModuloAux) {
      console.log("vamos a igualar");
      this.itemModulo = this.itemModuloAux;
    }
    else {
      console.log("es modo edición");     
    }
  }

  //metodo para cerrar el control
  cancel() {
    this.viewCtrl.dismiss();
  }

  //metodo para ocultar las descripciones a partir del cambio de toogle
  ocultarToogle(idDescripcion: string) {
    switch (idDescripcion) {
      case '1': this.itemModulo.cumplio2_1 = !this.itemModulo.cumplio2_1; break;
      case '2': this.itemModulo.cumplio2_2 = !this.itemModulo.cumplio2_2; break;
      case '3': this.itemModulo.cumplio2_3 = !this.itemModulo.cumplio2_3; break;
      case '4': this.itemModulo.cumplio2_4 = !this.itemModulo.cumplio2_4; break;
      case '5': this.itemModulo.cumplio2_5 = !this.itemModulo.cumplio2_5; break;
      case '6': this.itemModulo.cumplio2_6 = !this.itemModulo.cumplio2_6; break;
      case '7': this.itemModulo.cumplio2_7 = !this.itemModulo.cumplio2_7; break;
      case '8': this.itemModulo.cumplio2_8 = !this.itemModulo.cumplio2_8; break;
      case '9': this.itemModulo.cumplio2_9 = !this.itemModulo.cumplio2_9; break;
      case '10': this.itemModulo.cumplio2_10 = !this.itemModulo.cumplio2_10; break;
      case '11': this.itemModulo.cumplio2_11 = !this.itemModulo.cumplio2_11; break;
      case '12': this.itemModulo.cumplio2_12 = !this.itemModulo.cumplio2_12; break;
      case '13': this.itemModulo.cumplio2_13 = !this.itemModulo.cumplio2_13; break;
      case '14': this.itemModulo.cumplio2_14 = !this.itemModulo.cumplio2_14; break;
      case '15': this.itemModulo.cumplio2_15 = !this.itemModulo.cumplio2_15; break;
      case '16': this.itemModulo.cumplio2_16 = !this.itemModulo.cumplio2_16; break;
      case '17': this.itemModulo.cumplio2_17 = !this.itemModulo.cumplio2_17; break;
      case '18': this.itemModulo.cumplio2_18 = !this.itemModulo.cumplio2_18; break;
      case '19': this.itemModulo.cumplio2_19 = !this.itemModulo.cumplio2_19; break;
      case '20': this.itemModulo.cumplio2_20 = !this.itemModulo.cumplio2_20; break;
      case '21': this.itemModulo.cumplio2_21 = !this.itemModulo.cumplio2_21; break;

    }
  }

  //metodo para mostrar un loading...
  showLoading() {
    this.loadingCtrl.create({
      duration: 1000,
      content: 'Espere por favor...'
    }).present();
  }

  //metodo llamado desde el boton siguiente para 
  //navegar al siguiente modulo (modulo3)
  irAlSiguienteModulo() {
    this.showLoading();
    if(!this.modoLectura){
      this.agregarModulo();
    }
    this.navCtrl.push(Modulo_3Page, {
      'idInspeccion': this.idInspeccion,
      'idAeropuerto': this.idAeropuerto,
      'id': this.id,
      'nombreAeropuerto': this.nombreAeropuerto,
      'modoLectura':this.modoLectura
    });
  }

  //pop-up para confirmar los cambios a realizar
  confirmarCambios() {
    if(this.modoLectura){
      this.cancel();
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Confirmar cambios',
        message: '¿Seguro que desea guardar los cambios?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              this.eliminarInspeccion();
              this.navCtrl.push(InspeccionesPage, {
                'idAeropuerto': this.idAeropuerto,
                'nombreAeropuerto': this.nombreAeropuerto
              });
            }
          },
          {
            text: 'Sí',
            handler: () => {
              console.log('Guardando cambios...');
              this.agregarModulo();
              this.navCtrl.push(InspeccionesPage, {
                'idAeropuerto': this.idAeropuerto,
                'nombreAeropuerto': this.nombreAeropuerto
              });
            }
          }
        ]
      });
      alert.present();
    }
  }

  //metodo que escribe en la tabla modulo1 un registro
  agregarModulo() {
    this.itemModulo.idModulo = '2';
    console.log(this.itemModulo);
    this.db.getDocumentClient().put({
      'TableName': this.moduloTable + this.itemModulo.idModulo,
      'Item': this.itemModulo,
      'ConditionExpression': 'attribute_not_exists(this.idInspeccion)'
    }, (err, data) => {
      if (err) {
        console.log(err);
      }
    });
  }

  //metodo para volver a la pagina anterior
  volverAlaPaginaAnterior() {
    this.showLoading();
    if(!this.modoLectura){
      this.agregarModulo();
    }
    //this.navCtrl.pop();
    this.navCtrl.push(Modulo_1Page, {
      'idInspeccion': this.idInspeccion,
      'idAeropuerto': this.idAeropuerto,
      'id': this.id,
      'nombreAeropuerto': this.nombreAeropuerto,
      'modoLectura':this.modoLectura
    });
  }


  //metodo para eliminar la inspeccion en caso no 
  //se haya confirmado el guardado de cambios
  eliminarInspeccion() {
    this.db.getDocumentClient().delete({
      'TableName': this.inspeccionesTable,
      'Key': {
        'idATO': this.idAeropuerto,
        'id': this.id
      },
    }).promise().then((data) => {
      this.disminuirCorrelativoATO(this.idAeropuerto);
      this.eliminarModulosPorIncidencia();
      this.navCtrl.push(InspeccionesPage, {
        'idAeropuerto': this.idAeropuerto,
        'nombreAeropuerto': this.nombreAeropuerto
      });
    }).catch((err) => {
      console.log('there was an error', err);
    });
  }

  //eliminar todos los modulos de una incidencia iterando todos los modulos
  eliminarModulosPorIncidencia() {
    let modulos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    for (let modulo of modulos) {
      console.log("Estamos en el modulo: " + this.moduloTable + modulo);

      this.db.getDocumentClient().delete({
        'TableName': this.moduloTable + modulo,
        'Key': {
          'idInspeccion': this.idInspeccion
        },
      }).promise().then((data) => {
        console.log("Ya hemos eliminado el modulo: " + modulo)
      }).catch((err) => {
        console.log('there was an error', err);
      });

    }
  }

  //metodo para volver a setear el correlativo a -1
  disminuirCorrelativoATO(idAeropuerto) {
    //Actualizamos el correlativo de acuerdo a la accion
    this.db.getDocumentClient().update({
      'TableName': this.aeropuertoTable,
      'Key': {
        'idATO': this.idAeropuerto,
      },
      'UpdateExpression': "set #correlativo = :correlativoActual",
      'ExpressionAttributeNames': {
        '#correlativo': 'correlativo'
      },
      'ExpressionAttributeValues': {
        ":correlativoActual": this.id,
      },
    }, (err, data) => {
      if (err) {
        console.log(err);
      }
    });
  }

  getModulo(idModulo){
    this.db.getDocumentClient().get({
      'TableName': this.moduloTable+idModulo,
      'Key':{
        'idInspeccion' : this.idInspeccion,
      }
    }, (err, data) => {
      if (err) { 
        console.log("Error")
        console.log(err); 
      }
      else{
        console.log("aca devolvemos")
        console.log(data.Item)
        this.itemModuloAux = data.Item;
      }
    });
  }

  //editar formulario
  editarFormulario(){
    this.modoLectura = !this.modoLectura;
  }
}
