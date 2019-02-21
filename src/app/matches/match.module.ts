/* Angular modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

/** Angular Google Maps module */
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

/* Navestock Modules*/
import {NavestockMaterialModule} from '../root/match.material.module';
import {ImgModule} from '../imgModule/imgModule';

/* Navetock Services */
import {MatchDataService} from './matchdata-service/matchdata.service'

/* Navestock components */
import { environment } from '../../environments/environment';
import {MatchListComponent} from './matchlist/matchlist.component'
import {MatchDetailComponent} from './match-detail/match-detail.component';
import {BattingComponent} from './batting/batting.component';
import {BowlingComponent} from './bowling/bowling.component';
import {GroundComponent} from './ground/ground.component';
import {MatchWidgetComponent} from './match-widget/match-widget.component';

@NgModule({
    declarations: [
        MatchListComponent,
        MatchDetailComponent,
        BattingComponent,
        BowlingComponent,
        GroundComponent,
        MatchWidgetComponent
    ],
    imports: [ 
        CommonModule,
        NavestockMaterialModule,
        FlexLayoutModule,
        FormsModule,
        RouterModule,
        ImgModule,
       AgmCoreModule.forRoot(environment.googleMapKey)
         ],
    exports: [
        MatchListComponent,
        MatchDetailComponent,
        BattingComponent,
        BowlingComponent,
        GroundComponent,
        MatchWidgetComponent
    ],
    providers: [
        MatchDataService
    ],
})
export class MatchModule {}
