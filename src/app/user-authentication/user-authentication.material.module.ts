import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Material Design Modules */
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [],
    imports: [ CommonModule,
        MatButtonModule,
        MatIconModule,
        NoopAnimationsModule,
        CdkTableModule
    ],
    exports: [

        MatButtonModule,
        MatIconModule,
        NoopAnimationsModule,
        CdkTableModule
    ]
})
export class NavestockUserAuthenticationMaterialModule {}