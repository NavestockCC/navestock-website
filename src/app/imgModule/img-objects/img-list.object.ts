export class ImgListObject{
  // Origional IMG data fields
    public url:string;
    public fileName:string;
    public fullPath:string;
    public metadata: any;
 
//IMG Caption
    public caption:string;

    // Thumb IMG data fields
    public fileName_thumb:string;
    public metadata_thumb: any;
    public url_thumb:string;

    //Firebase DOC referance
    public FireStoreDocRef:string;

  constructor(){}  
}