/**
 * Resize Images uploaded to the Firebase Storage
*/
import * as functions from 'firebase-functions';

import * as gcs from '@google-cloud/storage';
import * as path from 'path';
import * as os from 'os';
import * as cpp from 'child-process-promise';
import {WriteDownloadURLComponent} from './write-dowloadurl';


export const onFileChange= functions.storage.object().onFinalize(event => {
    const gcsObject = gcs();
    const spawn = cpp.spawn;
    const bucket = event.bucket;
    const contentType = event.contentType;
    const filePath = event.name;
    const writeDownloadURLComponent = new WriteDownloadURLComponent();
    let FireStoreDocRef:any = null;
    let imgMetaData:any = null;
    console.log('File uploaded: ' + filePath);

    if (path.basename(filePath).startsWith('thumb-')) {
        return  null;
    }

    const destBucket = gcsObject.bucket(bucket);
    const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
    const metadata = { contentType: contentType };

    return destBucket.file(filePath).download({
        destination: tmpFilePath
    }).then(() => {
        //Convert Imgae to thumbnail using ImgaeMagic and write to temp file
        return spawn('convert', [tmpFilePath, '-thumbnail', '200x200', tmpFilePath]);
    }).then(() => {
        //Uplaod thumbnail temp file to storage bucket and rename file with prefic 'thumb-'
        return destBucket.upload(tmpFilePath, {
            destination:  path.dirname(filePath) + '/thumb-' + path.basename(filePath),
            metadata: metadata
        })
    }).then(()=>{
        return destBucket.file(filePath).getMetadata().then(
            metaResp => {
                FireStoreDocRef = metaResp[0].metadata.FireStoreDocRef;
                imgMetaData = metaResp
            }
        ).then(()=>{
            return destBucket.file(path.dirname(filePath) + '/thumb-' + path.basename(filePath)).getMetadata().then(
                metaResp => {
                    writeDownloadURLComponent.writeThumbImageData(FireStoreDocRef, metaResp, imgMetaData);
                }
            )
        });
    })
});
 