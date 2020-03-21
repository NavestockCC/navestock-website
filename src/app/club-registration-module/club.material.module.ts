import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatCardModule,
        MatSlideToggleModule,
        MatIconModule
    ],
    exports: [
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatCardModule,
        MatSlideToggleModule,
        MatIconModule
    ]
})
export class ClubMaterialModule {}
