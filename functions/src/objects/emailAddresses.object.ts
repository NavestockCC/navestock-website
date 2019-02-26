export class emailAddress{
    emailaddress:string;
    name:string;

    constructor(){
        this.emailaddress = "";
        this.name = "";
    }

    public setEmailAddress(
        emailaddress:string,
        name:string
    ){
        this.emailaddress = emailaddress;
        this.name = name;
    }
}