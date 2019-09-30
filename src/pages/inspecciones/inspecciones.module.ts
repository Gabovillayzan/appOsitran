import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspeccionesPage } from './inspecciones';

@NgModule({
  declarations: [
    InspeccionesPage,
  ],
  imports: [
    IonicPageModule.forChild(InspeccionesPage),
  ],
})
export class InspeccionesPageModule {}
