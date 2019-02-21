import * as admin from 'firebase-admin';


export class WriteDownloadURLComponent {

    constructor(private afs = admin.firestore()) {
    }

    public writeImageDownloadURL(docRef:string, downLoadURL:string){
        this.afs.doc(docRef).update({'url_thumb': downLoadURL});
    }

    public writeThumbImageData(docRef:string, metadata:any, metadataOrigionalIMG:any){
        this.afs.doc(docRef).update({'metadata_thumb': metadata, 'fileName_thumb': metadata[0].name, 'metadata': metadataOrigionalIMG});
    }

}
