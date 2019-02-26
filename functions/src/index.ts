// src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as AddMessage from './add-message';
//import * as PlaycricketMatchDetailImport from './playcricket-MatchDetailImport';
import * as PlaycricketMatchListImport from './playcricket-MatchListImport';
//import * as OnImageUploadResize from './resize-image-upload';
//import * as emailSend from './send-results';

admin.initializeApp(functions.config().firebase)

export const addMessage = AddMessage.helloNavestock;
//export const playcricketMatchDetailImport = PlaycricketMatchDetailImport.listener;
export const playcricketMatchListImport = PlaycricketMatchListImport.matchListImport;
//export const resizeimageupload = OnImageUploadResize.onFileChange;
//export const emailSendResults = emailSend.listener;