import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/**
 * Navestock component Imports
 */
import {AppRoutingModule} from '../app-routing/app-routing.module';
 import {ImgModule} from '../imgModule/imgModule';
 import {GalaDinnerComponent} from './gala-dinner/gala-dinner.component';
 import {Veterans7asideComponent} from './veterans7aside/veterans7aside.component';
 import {ColinBridgeVillageCupComponent} from './colin-bridge-village-cup/colin-bridge-village-cup.component';
 import {HomeComponent250} from './home-page/home250.component';

@NgModule({
    declarations: [
        GalaDinnerComponent,
        Veterans7asideComponent,
        ColinBridgeVillageCupComponent,
        HomeComponent250
    ],
    imports: [ 
        CommonModule,
        ImgModule,
        AppRoutingModule
    ],
    exports: [],
    providers: [],
})
export class Navestock250Module {}