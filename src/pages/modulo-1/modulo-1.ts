import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, LoadingController, AlertController } from 'ionic-angular';
import { DynamoDB, User } from '../../providers/providers';
import { Modulo_2Page } from '../modulo-2/modulo-2';
import { InspeccionesPage } from '../inspecciones/inspecciones';

@Component({
  selector: 'page-modulo-1',
  templateUrl: 'modulo-1.html',
})

export class Modulo_1Page {

  //declaración de vaiables a usar
  itemInspeccion: any;
  id: any;
  itemModulo: any;
  itemModuloAux: any;
  modoLectura: any;
  item: any;
  correlativo: any;
  isAndroid: boolean;
  pagina2: Modulo_2Page;
  devuelveModulo: boolean;

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

    this.getModulo(1);
    console.log(this.devuelveModulo)

    if (this.modoLectura && this.devuelveModulo) {
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

  //metodo para mostrar un loading...
  showLoading() {
    this.loadingCtrl.create({
      duration: 1000,
      content: 'Espere por favor...'
    }).present();
  }

  //metodo llamado desde el boton siguiente para 
  //navegar al siguiente modulo (modulo2)
  irAlSiguienteModulo() {
    this.showLoading();
    if(!this.modoLectura){
      this.agregarModulo();
    }
    this.navCtrl.push(Modulo_2Page, {
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
    this.itemModulo.idModulo = '1';
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
        this.devuelveModulo = false;
      }
      else{
        console.log("aca devolvemos")
        this.itemModuloAux = data.Item;
        this.devuelveModulo = true;
        console.log(this.devuelveModulo)
      }
    });
  }

  //editar formulario
  editarFormulario(){
    this.modoLectura = !this.modoLectura;
  }
}
