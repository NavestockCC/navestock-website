import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//Firebase imports
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FixtureFirebaseDBServices {
// declare variables and referances
   private navestockImages: Observable<any[]>;
   private navestockScoreboardService: Observable<any[]>;


constructor(private afDb: AngularFireDatabase) {
    }



//Methods relating to navestock Images

/**
 * Retrieve restoration project img storage URLs
 */

public getNavestockFixtureImages(fixtureId: string) {
  return this.navestockImages = this.afDb.list('/fixtureImages/' + fixtureId).valueChanges();  
    }

/**
 * Set  project img storage URLs

public setRestorationImg(ImgStocknr: string, imgData: restorationImage):void{
  let restImgRef = this.getRestorationImages(ImgStocknr);
  restImgRef.push(imgData);
 
}
 */

 /**
 * Retrieve restoration project img storage URLs
 */

public getNavestockScoreboard() {
  return this.navestockScoreboardService = this.afDb.object('/Scoreboard/').valueChanges();
    }

}

