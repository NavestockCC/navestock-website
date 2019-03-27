import * as functions from 'firebase-functions';
import {Storage}  from '@google-cloud/storage';
const gcs = new Storage();

import { tmpdir } from 'os';
import { join, dirname } from 'path';

import * as sharp from 'sharp';
import * as fs from 'fs-extra';

import {ImgWriteDownloadUrl} from "./image-write-downloadurl";

export const generateThumbs = functions.storage
  .object()
  .onFinalize(async object => {
    const bucket = gcs.bucket(object.bucket);
    const filePath = object.name;
    const fileName = filePath.split('/').pop();
    const bucketDir = dirname(filePath);
    const imgWriteDownloadUrl = new ImgWriteDownloadUrl();
    let FireStoreDocRef:string = null;
    let imgMetaData: any = null;


    const workingDir = join(tmpdir(), 'thumbs');
    const tmpFilePath = join(workingDir, 'source.png');

    if (fileName.includes('thumb@') || !object.contentType.includes('image')) {
      console.log('exiting function');
      return false;
    }

    // 0. Set the Firestore DB photo referance
    await bucket.file(filePath).getMetadata().then(
      metaResp => {
        imgMetaData = metaResp[0];
        if(metaResp[0].metadata.FireStoreDocRef){
          FireStoreDocRef = metaResp[0].metadata.FireStoreDocRef;
        }else{
          FireStoreDocRef = 'none';
        }
      }
    )

    // 1. Ensure thumbnail dir exists
    await fs.ensureDir(workingDir);

    // 2. Download Source File
    await bucket.file(filePath).download({
      destination: tmpFilePath
    });

    // 3. Resize the images and define an array of upload promises
    const sizes = [256];

    //Set the thumbName and path
    const thumbName = `thumb@${fileName}`;
    const thumbPath = join(workingDir, thumbName);

    const uploadPromises = sizes.map(async size => {
      // Resize source image
      await sharp(tmpFilePath)
        .resize(size, size)
        .toFile(thumbPath);

      // Upload to GCS
      return bucket.upload(thumbPath, {
        destination: join(bucketDir, thumbName)
      });
    });

    // 4. Run the upload operations
    await Promise.all(uploadPromises)

   await Promise.all([
      bucket.file(filePath).getSignedUrl({action: 'read', expires: '01-01-2120'}),
      bucket.file(join(bucketDir, thumbName)).getSignedUrl({action: 'read', expires: '01-01-2120'})
     // bucket.file(join(bucketDir, thumbName)).getMetadata()
    ]).then(
      values => {
        console.info('thumb_meta initiated');
        imgWriteDownloadUrl.writeImageDownloadURL(FireStoreDocRef, values[0][0], imgMetaData, values[1][0]);
      }
    ).catch(
      err => {console.log('err: ' + err)}
    )

    // 5. Cleanup remove the tmp/thumbs from the filesystem
    return fs.remove(workingDir);
  });