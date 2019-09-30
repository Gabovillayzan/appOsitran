import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { InspeccionesPage } from '../inspecciones/inspecciones';

import { DynamoDB, User } from '../../providers/providers';


declare var AWS: any;

@Component({
  selector: 'page-aeropuertos',
  templateUrl: 'aeropuertos.html',
})

export class AeropuertosPage {
  public items: any;
  public refresher: any;
  public data = [
    {
      id: "1",
      descripcion: "Iquitos"
    },
    {
      id: "2",
      descripcion: "Trujillo"
    },
    {
      id: "3",
      descripcion: "Pucallpa"
    },
    {
      id: "4",
      descripcion: "Chachapoyas"
    },
    {
      id: "5",
      descripcion: "Cajamarca"
    },
    {
      id: "6",
      descripcion: "Talara"
    },
    {
      id: "7",
      descripcion: "Tarapoto"
    },
    {
      id: "8",
      descripcion: "Anta"
    },
    {
      id: "9",
      descripcion: "Tumbes"
    },
    {
      id: "10",
      descripcion: "Chiclayo"
    },
    {
      id: "11",
      descripcion: "Pisco"
    },
    {
      id: "12",
      descripcion: "Piura"
    }
  ];


  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public user: User,
    public db: DynamoDB) {
  }

  filtrarPorAeropuerto(idAeropuerto, nombreAeropuerto) {
    console.log(idAeropuerto);
    this.navCtrl.push(InspeccionesPage, { 
      'idAeropuerto': idAeropuerto, 
      'nombreAeropuerto': nombreAeropuerto 
    });
  }

}
