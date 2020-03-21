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
  verificationPhoneObservable: Observable<any>;
  verificationPhone: string = null;
  verificationCode: string;
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


  sendLoginPhone() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const url = `https://us-central1-navestock-website.cloudfunctions.net/phoneAuthorisation?eml=`
    + this.emailLogin + `&vc=` +  appVerifier;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.verificationPhoneObservable = this.http.get(url, httpOptions)
      .pipe(
        share()
      );
  }

  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;
    this.verificationPhoneObservable.subscribe(
      resp => {
        this.verificationPhone = resp.phoneAuth as string;
        firebase.auth().signInWithPhoneNumber(this.verificationPhone, appVerifier)
        .then(result => {
            this.windowRef.confirmationResult = result;
        })
        .catch( error => console.log(error) );
      }
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
