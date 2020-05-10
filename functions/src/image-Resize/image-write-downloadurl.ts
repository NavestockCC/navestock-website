import * as admin from 'firebase-admin';

export class ImgWriteDownloadUrl {
    
    constructor(private afs = admin.firestore()) {}

    /**
     * Function to write the Image download url (origional and thnumb) and meta data (origional and thnumb)
     * @param firestoreDocRef:string - document reference in the Firestore DB. If 'firestoreDocRef == null' then firestoreDocRef is set to 'imgWithoutDBReferance' 
     * @param downloadURL - download url for the document in Firebase Storage
     * @param imgMetadata - imgage metadata for the document in Firebase Storage
     * @param thumbDownloadURL - thumb imgage download url for the document in Firebase Storage
     * @param thumbImgMetadata - thumb imgage metadata for the document in Firebase Storage
     */
    public writeImageDownloadURL(firestoreDocRef:string, downloadURL:any, imgMetadata:any, thumbDownloadURL:any) {
        if(firestoreDocRef !== 'none'){

            this.afs.doc(firestoreDocRef).update({ 'url_thumb': thumbDownloadURL, 'url': downloadURL, 'metadata': imgMetadata}).then(
                onfulfilled => {
                    console.log('DB update completed: ' + onfulfilled.writeTime)
                    console.log('url_thumb: ' + thumbDownloadURL);
                    console.log('downloadURL: ' + downloadURL);
                    console.log('metadata: ' + JSON.stringify(imgMetadata));
                },
                onrejected => {console.log('DB update rejected: ' + onrejected)}
            )
            .catch(err => console.error(new Error('E_ImgWriteDownloadUrl_1: ' + err)));
        } 
        //If the doc referance does not exist then writh the image data to imgWithoutDBReferance collection in the DB
        else{
            this.afs.collection('imgWithoutDBReferance').add({ 'url_thumb': thumbDownloadURL, 'url': downloadURL, 'metadata': imgMetadata})
            .then(
                onfulfilled => {
                    console.log('add Document Referance: ' + JSON.stringify(onfulfilled));
                    console.log('url_thumb: ' + thumbDownloadURL);
                    console.log('downloadURL: ' + downloadURL);
                    console.log('metadata: ' + JSON.stringify(imgMetadata));
                },
                onrejected => {console.log('DB add rejected: ' + onrejected)}
            )
            .catch(err => console.error(new Error(`E_ImgWriteDownloadUrl_2: ${err}`)));
        }
    }



}