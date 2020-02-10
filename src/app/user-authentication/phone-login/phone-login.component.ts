import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { WindowService } from '../user-authentication-service/window.service';
import { PhoneNumber } from './phone-number';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.scss']
})
export class PhoneLoginComponent implements OnInit {
  windowRef: any;
  emailLogin: string;
  verificationCode: Observable<any>;
  user: any;

  constructor(private win: WindowService,
              private afAuth: AngularFireAuth,
              private aFirestore: AngularFirestore,
              private http: HttpClient) { }

  ngOnInit() {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render();
  }


  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = '+447415950733';

    console.log('calling HTTP');

    const url = `https://us-central1-navestock-website.cloudfunctions.net/playcricketMatchDetailImport
                ?eml=` + this.emailLogin + `&vc=` +  appVerifier;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.verificationCode = this.http.get(url, httpOptions)
      .pipe(
        share()
      );
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {

                    this.user = result.user;

    })
    .catch( error => console.log(error, 'Incorrect code entered?'));
  }

}
