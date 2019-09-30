import { Component,Input, Output,EventEmitter  } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';

/**
 * Generated class for the SeccionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'seccion',
  templateUrl: 'seccion.html'
})
export class SeccionComponent {

  text: string;
  item: any;
  descripcionVisible : boolean =false;

  //Input and Outputs
  @Input() areaInspeccion: Array<String>;
  @Output() cambioToogle = new EventEmitter();


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public platform: Platform) {
      console.log(this.item);

    this.item = {
      'idSeccion': this.areaInspeccion[0]
    };
  }

  ocultarToogle(){
    console.log("se va ocultar");
  }

}
