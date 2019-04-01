// src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as AddMessage from './add-message';
import * as PlaycricketMatchDetailImport from './playcricket-MatchDetailImport';
import * as PlaycricketMatchListImport from './playcricket-MatchListImport';
import * as OnImageUploadResize from './image-Resize/image-resize';
//import * as emailSend from './send-results';

admin.initializeApp(functions.config().firebase);

export const addMessage = AddMessage.helloNavestock;
export const playcricketMatchDetailImport = PlaycricketMatchDetailImport.listener;
export const playcricketMatchListImports = PlaycricketMatchListImport.matchListImports;
export const resizeimageupload = OnImageUploadResize.generateThumbs;
//export const emailSendResults = emailSend.listener;