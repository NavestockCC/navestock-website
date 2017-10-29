export class scorecard{
idClub: number;
clubName: string;
teamId: number;
teamName: string;
idPlayer: number;
firstname: string;
lastname: string;
batingOrder: number;
runsScored: number;
idHowOut: number;
howOutDescription: string;
oversBowled: number;
wickets: number;
runsConseded: number;
idMatch: number;
player: string; 

constructor(idClb: number, clubNme: string, tmId: number, tmName: string, idPlyer: number, firstnme: string, lastnme: string, batingOrdr: number, runsScord: number, idHowOt: number, howOutDescriptn: string, oversBowld: number, wickts: number, runsConsedd: number, idMtch: number, playr: string)
    {
    this.idClub = idClb;
    this.clubName = clubNme;
    this.teamId = tmId;
    this.teamName = tmName;
    this. idPlayer = idPlyer;
    this.firstname = firstnme;
    this.lastname = lastnme;
    this.batingOrder = batingOrdr;
    this.runsScored = runsScord;
    this.idHowOut = idHowOt;
    this.howOutDescription = howOutDescriptn;
    this.oversBowled = oversBowld;
    this.wickets = wickts;
    this.runsConseded = runsConsedd;
    this.idMatch = idMtch;
    this.player = playr; 
    }
}