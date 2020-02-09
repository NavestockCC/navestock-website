import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  public userAuth: Observable<firebase.User> = null;

  constructor(public afAuth: AngularFireAuth) {
    /** Set the user authentication status */
    this.userAuth = this.afAuth.authState;
  }

  public login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  public logout() {
    this.afAuth.auth.signOut();
  }

  public getUserAuth(): Observable<firebase.User>{
    return this.userAuth;
  }
}