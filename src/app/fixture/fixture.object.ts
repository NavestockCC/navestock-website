export class fixture{
    public matchId: number;
    public navestockTeamId: number;
    public navestockTeamName: string;
    public oppositionTeamId: number;
    public oppositionTeamName: string;
    public matchType: string;
    public homeOrAway:string;
    public matchDate:Date;
    public matchStartTime: string;
    public idGround: number;
    public groundName: string;
    public groundAddress1: string;
    public groundAddress2: string;
    public groundAddressTown: string;
    public groundAddressCounty: string;
    public groundPostCode: string;
    public idWinningTeam: number;
    public winningTeamName: string;
    public navestockRuns: number;
    public navestockWickets: number;
    public oppositionRuns: number;
    public oppositionWickets: number;
    public fixtureStatus: string;
    public oppositionClubId: number;

constructor(mtchId: number, nvstockTeamId: number, nvstockTeamName: string, oppTeamId: number, oppTeamName: string, 
            mtchType: string, hmeOrAway:string, mtchDate:Date, mtchStartTime: string, idGrnd: number, grndName: string, grndAddress1: string,
            grndAddress2: string, grndAddressTown: string, grndAddressCounty: string, grndPostCode: string, idWinningTm: number,
            winningTmName: string, nvstockRuns: number, nvstockWickets: number, oppRuns: number, oppWickets: number,
            fixtreStatus: string, oppClubId: number ){

                this.matchId = mtchId;
                this.navestockTeamId = nvstockTeamId;
                this.navestockTeamName = nvstockTeamName;
                this.oppositionTeamId = oppTeamId;
                this.oppositionTeamName = oppTeamName;
                this.matchType = mtchType;
                this.homeOrAway = hmeOrAway;
                this.matchDate = mtchDate;
                this.matchStartTime = mtchStartTime;
                this.idGround = idGrnd;
                this.groundName = grndName;
                this.groundAddress1 = grndAddress1;
                this.groundAddress2 = grndAddress2;
                this.groundAddressTown = grndAddressTown;
                this.groundAddressCounty = grndAddressCounty;
                this.groundPostCode = grndPostCode;
                this.idWinningTeam = idWinningTm;
                this.winningTeamName = winningTmName;
                this.navestockRuns = nvstockRuns;
                this.navestockWickets = nvstockWickets;
                this.oppositionRuns = oppRuns;
                this.oppositionWickets = oppWickets;
                this.fixtureStatus = fixtreStatus;
                this.oppositionClubId = oppClubId;

            };

}