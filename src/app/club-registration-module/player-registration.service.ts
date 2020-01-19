import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MemberObject } from './player.object';

@Injectable({
  providedIn: 'root'
})
export class PlayerRegistrationService {
  private memberCollection: AngularFirestoreCollection<any> = this.afs.collection<MemberObject>('Members');

  constructor(private afs: AngularFirestore) { }

  /**
   * Saves member data
   * @param playerData: MemberObject
   */
  savePlayerData(playerData: MemberObject): void {
    // this.memberCollection = this.afs.collection<MemberObject>('Members');
    this.memberCollection.add(playerData);
  }

  /**
   * Gets member data
   * @param memberId: string
   * @returns member data as Observable<MemberObject[]>
   */
  getMemberData(memberId: string): Observable<MemberObject[]> {
    return this.afs.collectionGroup<MemberObject>('Members', ref => ref.where('email', '==', memberId)).valueChanges();
  }
}
