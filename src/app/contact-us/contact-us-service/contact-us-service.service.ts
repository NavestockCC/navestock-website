import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

/** Navestock Object Imports */
import { CommitteeMember } from '../contact-us-object/committee-member';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {



  constructor(private afs: AngularFirestore) { }


  getCommitteeMembers(): AngularFirestoreCollection<CommitteeMember> {
    return this.afs.collection<CommitteeMember>('NavestockCommitee', ref => ref.where('Publish', '==', true).where('MemberType', '==', 'Committee').orderBy('SortPosition', 'asc'));
  }

  getCaptains(): AngularFirestoreCollection<CommitteeMember> {
    return this.afs.collection<CommitteeMember>('NavestockCommitee', ref => ref.where('Publish', '==', true).where('MemberType', '==', 'Captains').orderBy('SortPosition', 'asc'));
  }

  saveCommitteeMembers(CM: CommitteeMember):void {
    if (CM.Key) {
      this.afs.doc<CommitteeMember>('NavestockCommitee/' + CM.Key).update(CM)
    } 
    else {
      this.afs.collection('NavestockCommitee').add(CM).then(ref => {
        this.afs.doc<CommitteeMember>(ref.path).update({ 'Key': ref.id })
      })
    }
  }

  deleteCommitteeMembers(CM:CommitteeMember):void{
    if(CM.Key){
      this.afs.doc<CommitteeMember>('NavestockCommitee/' + CM.Key).delete();
    }
  }


}


