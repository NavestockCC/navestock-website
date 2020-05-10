import * as functions from 'firebase-functions'

export const helloNavestock = functions.pubsub
    .topic('Test_Messaging')
    .onPublish( msgPayload => {
        try {
            const msg = msgPayload.json.message;
            console.log('Message for Navestock: ' + msg);
        } catch (error) {
            console.error(new Error('E_helloNavestock: ' + error));
        }
    });
