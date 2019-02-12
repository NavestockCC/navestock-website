import { Injectable} from '@angular/core';
import {Observable} from 'rxjs';


//Firebase imports
import { AngularFireDatabase } from '@angular/fire/database'; //Realtime DB
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'; // Firestore

/** Navestock Objects */
import {navestockTeam} from '../objects/navestock-teams.objects';

@Injectable({
  providedIn: 'root'
})
export class FixtureFirebaseDBServices{
// declare variables and referances
   private navestockImages: Observable<any[]>;
   private navestockScoreboardService:Observable<any[]>;



constructor(
  private afDb: AngularFireDatabase,
  private afs: AngularFirestore) 
  { 

   }


//Methods relating to navestock Images

/**
 * Retrieve restoration project img storage URLs
 */

public getNavestockFixtureImages(fixtureId: string): Observable<any[]>{
  return this.navestockImages = this.afDb.list('/fixtureImages/' + fixtureId).valueChanges();  
    }


public getNavestockScoreboard():Observable<any[]> {
  return this.navestockScoreboardService = this.afDb.object('/Scoreboard/').valueChanges() as Observable <any[]>;
    }

public getNavestockTeams(menuVisible: boolean, matchWidgetVisible: boolean):Observable<navestockTeam[]>{
  let menuObservable: AngularFirestoreCollection<navestockTeam>;

  if(menuVisible === true && matchWidgetVisible != true){
      menuObservable = this.afs.collection<navestockTeam>('NavestockTeams', ref => (ref.where('visible_Menu', '==', true)));
    } 
    else if(menuVisible != true && matchWidgetVisible === true){
      menuObservable = this.afs.collection<navestockTeam>('NavestockTeams', ref => (ref.where('visible_MatchWidget', '==', true)));
    }
    else if(menuVisible === true && matchWidgetVisible === true){
      menuObservable = this.afs.collection<navestockTeam>('NavestockTeams', ref => (ref.where('visible_Menu', '==', true).where('visible_MatchWidget', '==', true)));
    }

  return menuObservable.valueChanges()
}    

}

