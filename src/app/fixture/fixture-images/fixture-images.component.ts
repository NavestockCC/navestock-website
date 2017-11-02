import { Component, OnInit, Input } from '@angular/core';
import {FixtureFirebaseDBServices} from '../../services/navestock.firebase.db.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'fixture-img-list',
    templateUrl: './fixture-images.component.html',
    providers: [FixtureFirebaseDBServices],
})
export class FixtureImgagesComponent implements OnInit {

   @Input() fixtureId:string;
    
    fixtureImgList: Observable<any[]>;

    constructor(private fixtureService: FixtureFirebaseDBServices) { }

    ngOnInit() {
        this.fixtureImgList = this.fixtureService.getNavestockFixtureImages(String(this.fixtureId));
    }
}