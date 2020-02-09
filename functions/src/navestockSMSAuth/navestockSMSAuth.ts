import * as admin from 'firebase-admin';

export class NavestockSMSAuth {
    private memberDetails: admin.firestore.CollectionReference;


    constructor(private afs = admin.firestore()) {
        this.memberDetails = this.afs.collection('Members');
    }


    /**
     * Gets phone number from the member account using the email as a UID then returns the phone number.
     * @param loginEmail: string use email address as UID
     * @returns phone number(string) associated with the email UID
     */
    public getPhoneforAuth(loginEmail: string){

        this.memberDetails.limit(1)
        .where('memberAuth.email', '==', loginEmail);
        
       return this.memberDetails.get()
    }



}