import * as admin from 'firebase-admin';
import * as serviceAccount from './environments/navestock-website-04b2617e4f2a';

//** HTTP Functions */
import * as AddMessage from './add-message';

import * as OnImageUploadResize from './image-Resize/image-resize';
import * as emailSend from './emailResults/index';
import * as phoneAuth from './navestockSMSAuth/index';

//** PubSub Functions */
import * as AddMessagePubSub from './add-message-pubsub';

//PlayCricket Match List Import Functions
import * as GetPlayCricketMatchListPubSub from './playcricket-MatchListImport/pubsub/getPlayCricketMatchList';
import * as MatchListLogger from './playcricket-MatchListImport/pubsub/MatchListLogger';
import * as MatchListImport from './playcricket-MatchListImport/pubsub/MatchListImport';

//PlayCricket MatchDetails Import Functions
import * as PlaycricketMatchDetailImport from './playcricket-MatchDetailImport/http';
import * as GetPlayCricketMatchDetailsPubSub from './playcricket-MatchDetailImport/pubsub/getPlayCricketMatchDetails';
import * as MatchDetailImport from './playcricket-MatchDetailImport/pubsub/MatchDetailsImport';
import * as MatchDetailImportInnings from './playcricket-MatchDetailImport/pubsub/MatchDetailsImportInnings';
import * as MatchDetailLogger from './playcricket-MatchDetailImport/pubsub/MatchDetailsLogger';

//Player Stats Functions
import * as PlayerStatsImport from './navestock-PlayerStats/navestock_PlayerStats';


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
  };
  
admin.initializeApp({
    credential: admin.credential.cert(authparams),
    });


export const addMessage = AddMessage.helloNavestock;

export const resizeimageupload = OnImageUploadResize.generateThumbs;
export const emailSendResults = emailSend.emailResults;
export const phoneAuthorisation = phoneAuth.navestockSMSAuth;
export const addMessagePubSub = AddMessagePubSub.helloNavestock;

//PlayCricket MatchList Import Functions
export const getPlayCricketMatchListPubSub = GetPlayCricketMatchListPubSub.getPlayCricketMatchListPubSub;
export const matchListLogger = MatchListLogger.matchListLogger;
export const matchListImport = MatchListImport.matchListImport;

//PlayCricket MatchDetails Import Functions
export const playcricketMatchDetailImport = PlaycricketMatchDetailImport.listener; // HTTP function to trigger Match Detail Import
export const  getPlayCricketMatchDetailsPubSub = GetPlayCricketMatchDetailsPubSub.getPlayCricketMatchDetailsPubSub; // Pull data from playcricket API
export const  matchDetailImport = MatchDetailImport.matchDetailImport; // Write Matchdetails to DB
export const  matchDetailImportInnings = MatchDetailImportInnings.matchDetailImportInnings; // Write Match Innings to DB
export const  matchDetailLogger = MatchDetailLogger.matchDetailLogger; // Log data to conole pulled from PlayCricket Match Details API

//Player Stats Functions
export const playerStatsImport = PlayerStatsImport.playerStatsImport;