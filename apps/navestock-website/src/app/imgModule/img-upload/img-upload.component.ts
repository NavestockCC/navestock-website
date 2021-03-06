import { Component, OnInit, Input, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'; // Firestore
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { finalize } from 'rxjs/operators';
import { Observable, from } from 'rxjs';


import { imgStorageObject } from '../img-objects/storage.setup.object';
import { ImgListObject } from '../img-objects/img-list.object';


@Component({
  selector: 'ncc-app-img-upload',
  templateUrl: './img-upload.component.html'
})
export class ImgUploadComponent implements OnInit {
  public selectedFile: File;
  @Input() photosToDisplay: string; // sting to identify how the photos should be treated. See storage.object.ts for configuration
  @Input() identifier: string; // string to identify the specific item. See storage.object.ts for configuration


  private filePath: string = null;
  public uploadPercent: Observable<number>;
  private downloadURL: Observable<string>;
  private downloadURL_thumb: Observable<string>;
  public showUploadProgress = false;
  private imgstorageobject: imgStorageObject = new imgStorageObject();
  public userAuth: Observable<any> = null;

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    const photoRef: string = null;
    this.imgstorageobject.setimgStorageObject(this.photosToDisplay, this.identifier);
    this.filePath = this.imgstorageobject.fireStorageRef;
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.showUploadProgress = true;
    const file = this.selectedFile;
    const fileRef = this.storage.ref(this.filePath + '/' + file.name);
    const task = this.storage.upload(this.filePath + '/' + file.name, file);
    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        const tmpImgObject: ImgListObject = new ImgListObject();
        let fireStoreImgListObjectRef = '00000';

        // after upload of image extract dowload url
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(res => {
          tmpImgObject.url = res;
          tmpImgObject.url_thumb = null;
          tmpImgObject.fileName = file.name;
          tmpImgObject.fullPath = this.filePath + '/' + file.name;
          this.afs.collection(this.imgstorageobject.fireClourFireRef).add(JSON.parse(JSON.stringify(tmpImgObject)))
          .then(
            resp => {
              const metadata = {
                customMetadata: {
                  'FireStoreDocRef': resp.path,
                  'FireStoreDocId': resp.id
                }
              };
              fileRef.updateMetadata(metadata);
              fireStoreImgListObjectRef = resp.id;
              resp.update({'FireStoreDocRef': resp.path});
            }
          );
          }); // end subscribe

        this.showUploadProgress = false; // after uplaod completed set show progress bar to fale
        this.selectedFile = null; // after uplaod completed set selected file name to null
      }) // end finalize
    ).subscribe(); // end pipe
  } // end onUpload

  public canselUpload() {
    this.selectedFile = null; // set selected file name to null
  }

  public login() {
    this.userAuth = from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }
  public logout() {
    this.afAuth.signOut();
  }

}
