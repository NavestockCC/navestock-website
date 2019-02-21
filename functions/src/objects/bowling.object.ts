import {uuid} from './uuid.objects';

export class bowling{
    bowler_name: string;
    bowler_id: string;
    overs: number;
    maidens: number;
    runs: number;
    wides: number;
    wickets: number;
    no_balls: number;

    setBowling(
        bowler_name: string,
        bowler_id: string,
        overs: string,
        maidens: string,
        runs: string,
        wides: string,
        wickets: string,
        no_balls: string
    ){
        const uuId = new uuid(); //Unique ID generatot called
        
        if(bowler_id === null || bowler_id === ""){
            this.bowler_id = uuId.generateUUID();
            this.bowler_name = 'Bowler Unidentified';
        }else{
            this.bowler_id = bowler_id;
            this.bowler_name = bowler_name ;
        }
        this.overs = +overs;
        this.maidens = +maidens;
        this.runs = +runs;
        this.wides = +wides ;
        this.wickets = +wickets;
        this.no_balls = +no_balls;
    }

}