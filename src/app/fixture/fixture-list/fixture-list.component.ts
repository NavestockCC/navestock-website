import { Component, OnInit, OnDestroy} from '@angular/core';
import {FixtureDataService} from '../fixture-data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {fixture} from '../fixture.object';
import {fixturelist} from '../fixturelist.object';


@Component({
  selector: 'fixture-list',
  templateUrl: './fixture-list.component.html',
  styleUrls: ['./fixture-list.component.css']
})
export class FixtureListComponent implements OnInit, OnDestroy{
  public fixturelistdata: {MonthName:string; listoffixtures: fixturelist}[] = [];
  public matchyears: Observable<String[]>;
  public tmid: number;
  private sub: any;

  constructor(private fixturewidgetdataService: FixtureDataService, private route: ActivatedRoute) {
       
  }

ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.tmid = +params['tmid']; // (+) converts string 'id' to a number
       this.fixturelistdata = this.fixturewidgetdataService.getfixturelistData(this.tmid, String(new Date().getFullYear()));
       this.matchyears = this.fixturewidgetdataService.getmatchYears(this.tmid);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  selectedfixture(f:fixture){
    this.fixturewidgetdataService.setSelectedFixture(f);
  }

  getFixturelistData(teamId:number, matchYear:string){
    this.fixturelistdata = this.fixturewidgetdataService.getfixturelistData(this.tmid, matchYear);
  }

}   
