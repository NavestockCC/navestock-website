import * as admin from 'firebase-admin';
import * as AddMessage from './add-message';
import * as PlaycricketMatchDetailImport from './playcricket-MatchDetailImport';
import * as PlaycricketMatchListImport from './playcricket-MatchListImport';
import * as OnImageUploadResize from './image-Resize/image-resize';
import * as emailSend from './emailResults/index';
import * as phoneAuth from './navestockSMSAuth/index';
import * as AddMessagePubSub from './add-message-pubsub';
import * as PlaycricketGetMatchListPubSub from './playcricket-getMatchList-pubsub';
import * as serviceAccount from './environments/navestock-website-04b2617e4f2a';


const authparams = {
    type: serviceAccount.firebaseAuthData.type, 
    projectId: serviceAccount.firebaseAuthData.project_id,
    privateKeyId: serviceAccount.firebaseAuthData.private_key_id,
    privateKey: serviceAccount.firebaseAuthData.private_key,
    clientEmail: serviceAccount.firebaseAuthData.client_email,
    clientId: serviceAccount.firebaseAuthData.client_id,
    authUri: serviceAccount.firebaseAuthData.auth_uri,
    tokenUri: serviceAccount.firebaseAuthData.token_uri,
    authProviderX509CertUrl: serviceAccount.firebaseAuthData.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.firebaseAuthData.client_x509_cert_url
  }
admin.initializeApp({
    credential: admin.credential.cert(authparams),
    });


export const addMessage = AddMessage.helloNavestock;
export const playcricketMatchDetailImport = PlaycricketMatchDetailImport.listener;
export const playcricketMatchListImports = PlaycricketMatchListImport.matchListImports;
export const resizeimageupload = OnImageUploadResize.generateThumbs;
export const emailSendResults = emailSend.emailResults;
export const phoneAuthorisation = phoneAuth.navestockSMSAuth;
export const addMessagePubSub = AddMessagePubSub.helloNavestock;
export const playcricketGetMatchListPubSub = PlaycricketGetMatchListPubSub.playcricketGetMatchList;