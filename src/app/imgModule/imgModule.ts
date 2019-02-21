import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

/* AngularFire2 Imports */
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

/* Component Imports */
import {ImgViewerComponent} from './img-viewer/img-viewer.component';
import {ImgUploadComponent} from './img-upload/img-upload.component';

/* Moddule Import */
import { NavestockMaterialModule} from '../root/match.material.module';

/*Service Imports */
import {ImgViewerService} from './img-viewer/img-viewer.service';

@NgModule({
    declarations: [
        ImgViewerComponent,
        ImgUploadComponent
    ],
    imports: [ 
        CommonModule,
        NavestockMaterialModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule,
        AngularFireAuthModule,
        AngularFirestoreModule
     ],
    exports: [
        ImgViewerComponent,
        ImgUploadComponent
    ],
    providers: [
        ImgViewerService
    ],
})
export class ImgModule {}