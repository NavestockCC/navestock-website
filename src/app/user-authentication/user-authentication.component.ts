import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, from } from 'rxjs';

import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'user-authentication',
  templateUrl: './user-authentication.component.html',
  styleUrls: ['./user-authentication.component.scss']
})
export class UserAuthenticationComponent implements OnInit {
  public userAuth: Observable<firebase.User> = null;
  public userAuthCredentials: Observable<any> = null;
  public userPhoto: string = null;

  constructor(public afAuth: AngularFireAuth, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    /** Register person icon  */
    iconRegistry.addSvgIcon(
      'person',
      sanitizer.bypassSecurityTrustResourceUrl('./app/icons/baseline-person-24px.svg'));
  }

  ngOnInit() {
    this.userAuth = this.afAuth.authState;
    this.userAuth.subscribe(res => {
      if(res){
        this.userPhoto = res.photoURL
      }
    });
  }

  public login() {
    this.userAuthCredentials = from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()));
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
