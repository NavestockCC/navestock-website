import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//Firebase imports
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class FixtureFirebaseDBServices {
// declare variables and referances
   private navestockImages: FirebaseListObservable<any[]>;
   private navestockScoreboardService: FirebaseObjectObservable<any[]>;


constructor(private af: AngularFire) {
    }



//Methods relating to navestock Images

/**
 * Retrieve restoration project img storage URLs
 */

public getNavestockFixtureImages(fixtureId: string) {
  return this.navestockImages = this.af.database.list('/fixtureImages/' + fixtureId);  
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
  return this.navestockScoreboardService = this.af.database.object('/Scoreboard/')
    }

}

