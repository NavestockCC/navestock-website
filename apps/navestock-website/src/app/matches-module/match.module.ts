/* Angular modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

/** Angular Google Maps module */
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

/* Navestock Modules*/
import {NavestockMaterialModule} from '../app-root-module/match.material.module';
import {ImgModule} from '../imgModule/imgModule';
import {UserAuthenticationModule} from '../user-authentication-module/user-authentication.module';

/* Navetock Services */
import {MatchDataService} from './matchdata-service/matchdata.service';

/* Navestock components */
import { environment } from '../../environments/environment';
import {MatchListComponent} from './matchlist/matchlist/matchlist.component';
import {MatchDetailComponent} from './match-detail/match-detail/match-detail.component';
import {MatchDetailComponentAdmin} from './match-detail/match-detail-admin/match-detail-admin.component';
import {BattingComponent} from './batting/batting.component';
import {BowlingComponent} from './bowling/bowling.component';
import {GroundComponent} from './ground/ground/ground.component';
import {GroundAdminComponent} from './ground/ground-admin/ground-admin.component';
import {MatchWidgetComponent} from './match-widget/match-widget.component';
import {MatchListComponentAdmin} from './matchlist/matchlist-admin/matchlist-admin.component';
import { AllGroundsComponent } from './all-grounds/all-grounds.component';
import { ReverseArrayPipe } from './pipes/reverse_array/reverse.pipe';
import { ImplicitReceiver } from '@angular/compiler';
import { MatchwidgetdataPipe } from './pipes/match_widget/matchwidgetdata.pipe';
import { MatchImportComponent } from './match-import/match-import.component';

@NgModule({
    declarations: [
        MatchListComponent,
        MatchDetailComponent,
        BattingComponent,
        BowlingComponent,
        GroundComponent,
        MatchWidgetComponent,
        MatchListComponentAdmin,
        MatchDetailComponentAdmin,
        GroundAdminComponent,
        AllGroundsComponent,
        ReverseArrayPipe,
        MatchwidgetdataPipe,
        MatchImportComponent
    ],
    imports: [
        CommonModule,
        NavestockMaterialModule,
        FlexLayoutModule,
        FormsModule,
        RouterModule,
        ImgModule,
        AgmCoreModule.forRoot(environment.googleMapKey),
        UserAuthenticationModule
         ],
    exports: [
        MatchListComponent,
        MatchDetailComponent,
        BattingComponent,
        BowlingComponent,
        GroundComponent,
        MatchWidgetComponent,
        MatchListComponentAdmin,
        MatchDetailComponentAdmin,
        GroundAdminComponent
    ],
    providers: [
        MatchDataService
    ],
})
export class MatchModule {}
