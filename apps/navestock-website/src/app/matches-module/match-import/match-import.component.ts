
import { Timestamp } from '@firebase/firestore-types';

import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';

import { matchItem } from '../objects/matchlist.object';

import { MATCHLIST } from './matchlistData';


@Component({
  selector: 'ncc-app-match-import',
  templateUrl: './match-import.component.html'
})
export class MatchImportComponent implements OnInit {

  private matchList_Col: AngularFirestoreCollection;
  private matchListData = MATCHLIST;

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.matchList_Col = this.afs.collection('MatchList');
  }

  /**
   * importList
   */
  public importList():void {
    const matchItemObj = new matchItem();
    console.log('importList: Start');
    let tmpImportObj: any = {};
    this.matchListData.matches.forEach(itm => {
    
      const matchToAdd = {
        ...itm,
        'id': itm.id.toString(),
        'last_updated': matchItemObj.toTimestap(itm.last_updated),
        'match_date': matchItemObj.toTimestap(itm.match_date, itm.match_time)
      };
      tmpImportObj[matchToAdd.id] = matchToAdd;
    });

    this.matchList_Col.doc('matches').set(tmpImportObj)

    }

                        

  /**
   * importDetail
   */
  public importDetail():void {
    console.log('importDetail: Start');
  }

}

