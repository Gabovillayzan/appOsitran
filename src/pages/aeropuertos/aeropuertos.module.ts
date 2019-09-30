import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AeropuertosPage } from './aeropuertos';

@NgModule({
  declarations: [
    AeropuertosPage,
  ],
  imports: [
    IonicPageModule.forChild(AeropuertosPage),
  ],
})
export class AeropuertosPageModule {}
