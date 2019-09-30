import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspeccionesCrearPage } from './inspecciones-crear';

@NgModule({
  declarations: [
    InspeccionesCrearPage,
  ],
  imports: [
    IonicPageModule.forChild(InspeccionesCrearPage)
  ],
})
export class InspeccionesCrearPageModule {}
