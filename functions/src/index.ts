
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as AddMessage from './add-message';
import * as PlaycricketMatchDetailImport from './playcricket-MatchDetailImport';
import * as PlaycricketMatchListImport from './playcricket-MatchListImport';
import * as OnImageUploadResize from './image-Resize/image-resize';
import * as emailSend from './emailResults/index';
import * as phoneAuth from './navestockSMSAuth/index';
import * as AddMessagePubSub from './add-message-pubsub';
import * as PlaycricketGetMatchListPubSub from './playcricket-getMatchList-pubsub';

admin.initializeApp(
    functions.config().firebase
    );

export const addMessage = AddMessage.helloNavestock;
export const playcricketMatchDetailImport = PlaycricketMatchDetailImport.listener;
export const playcricketMatchListImports = PlaycricketMatchListImport.matchListImports;
export const resizeimageupload = OnImageUploadResize.generateThumbs;
export const emailSendResults = emailSend.emailResults;
export const phoneAuthorisation = phoneAuth.navestockSMSAuth;
export const addMessagePubSub = AddMessagePubSub.helloNavestock;
export const playcricketGetMatchListPubSub = PlaycricketGetMatchListPubSub.playcricketGetMatchList;