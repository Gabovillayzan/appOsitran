import { NgModule } from '@angular/core';
import { SeccionComponent } from './seccion/seccion';
import { IonicModule } from 'ionic-angular'
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
	declarations: [SeccionComponent],
	imports: [IonicModule, SuperTabsModule],
	exports: [SeccionComponent]
})
export class ComponentsModule {}
