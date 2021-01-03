
import * as firebase from 'firebase/app'

import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';

import { matchItem } from '../objects/matchlist.object';

import { MATCHLIST } from './matchlistData';
import { Observable } from 'rxjs';


@Component({
  selector: 'ncc-app-match-import',
  templateUrl: './match-import.component.html'
})
export class MatchImportComponent implements OnInit {

  public matchList: Observable<any>;

  private matchList_Col: AngularFirestoreCollection;
  private matchListData = MATCHLIST;



  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.matchList_Col = this.afs.collection('MatchList');
    this.matchList = this.getMatchList('2019');
  }

  /**
   * Imports list
   * @param importSeason 
   */
  public importList(importSeason: string):void {
    const matchItemObj = new matchItem();
    console.log('importList: Start');
    const tmpImportObj: any = {};

    this.matchListData.matches.forEach(itm => {
    tmpImportObj['season']= {season: importSeason, lastupdated: firebase.default.firestore.Timestamp.now()};
      const matchToAdd = {
        ...itm,
        'id': itm.id.toString(),
        'last_updated': matchItemObj.toTimestap(itm.last_updated),
        'match_date': matchItemObj.toTimestap(itm.match_date, itm.match_time)
      };
      tmpImportObj[matchToAdd.id] = matchToAdd;
    });

    this.matchList_Col.doc(importSeason).set(tmpImportObj)

    }

                        

  /**
   * importDetail
   */
  public importDetail():void {
    console.log('importDetail: Start');
  }


  private getMatchList(season: string):Observable<any> {
    return this.matchList_Col.doc(season).valueChanges();
  }

}

