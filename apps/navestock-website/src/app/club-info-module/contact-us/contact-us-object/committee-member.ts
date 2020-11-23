export class CommitteeMember {
    public Key: string | undefined;
    public Title: string | undefined;
    public Name: string | undefined;
    public Tel: string | undefined;
    public email: string | undefined;
    public Publish: boolean | undefined;
    public SortPosition: number | undefined;
    public MemberType: string | undefined;
    public ContactDetailsPublish: boolean;
    public TelPublish: boolean;
    public emailPublish: boolean;

   
    constructor() {this.initCommitteeMember()}

        initCommitteeMember(): void{
            this.Key;
            this.Title;
            this.Name;
            this.Tel;
            this.email;
            this.Publish = false;
            this.SortPosition;
            this.MemberType;
            this.ContactDetailsPublish = false;
            this.TelPublish = false;
            this.emailPublish = false;
        }

}
