export class CommitteeMember {
    public Key: string;
    public Title: string;
    public Name: string;
    public Tel: string;
    public email: string;
    public Publish: boolean;
    public SortPosition: number;
    public MemberType: string;
   
    constructor() {this.initCommitteeMember()}

        initCommitteeMember(): void{
            this.Key = null;
            this.Title = null;
            this.Name = null;
            this.Tel = null;
            this.email = null;
            this.Publish = false;
            this.SortPosition = null;
            this.MemberType = null;
        }

}
