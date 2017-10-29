import { Component, OnInit} from '@angular/core';
import {FixtureDataService} from '../fixture-data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {fixture} from '../fixture.object';
import {fixturelist} from '../fixturelist.object';

const NaveStockTeams: {tmName:string; tmId:number;}[] = [{tmName:'Sunday XI', tmId: 1}, {tmName:'1st  XI', tmId: 2}, {tmName:'2nd  XI', tmId: 5}];

@Component({
  selector: 'fixturewidget',
  templateUrl: './fixture-widget.component.html',
  styleUrls: ['./fixture-widget.component.css']
})
export class FixtureWidgetComponent{
  
  public fixturewidgetdata: {teamname:string; listoffixtures: fixturelist}[] = [];
  

  errorMessage: string;


  constructor(private fixturewidgetdataService: FixtureDataService, private route: ActivatedRoute) {
    this.fixturewidgetdata = this.fixturewidgetdataService.getfixturewidgetData(NaveStockTeams);     
  }

  selectedfixture(f:fixture){
    this.fixturewidgetdataService.setSelectedFixture(f);
  }
}                     