
import {uuid} from './uuid.objects';

export class batting{
    position: number;
    batsman_name: string;
    batsman_id: string;
    how_out: string;
    fielder_name: string;
    fielder_id: string;                                             
    bowler_name: string;
    bowler_id: string;
    runs: number;
    fours: number;
    sixes: number;
    balls: number;
    
    constructor(){
        this.position = 0;
        this.batsman_name = "";
        this.batsman_id = "";
        this.how_out = "";
        this.fielder_name = "";
        this.fielder_id = "";
        this.bowler_name = "";
        this.bowler_id = "";
        this.runs = 0;
        this.fours = 0;
        this.sixes = 0;
        this.balls = 0;
    }

    setbatting(
        position: string,
        batsman_name: string,
        batsman_id: string,
        how_out: string,
        fielder_name: string,
        fielder_id: string,
        bowler_name: string,
        bowler_id: string,
        runs: string,
        fours: string,
        sixes: string,
        balls: string,
        
    ){
        const uuId = new uuid(); //Unique ID generatot called
        this.position = +position;
        
        if(batsman_id === null || batsman_id === ""){
            this.batsman_id = uuId.generateUUID();
            this.batsman_name = 'Batsman Unidentified'
        } else{
            this.batsman_id = batsman_id.toString();
            this.batsman_name = batsman_name;
        }
        this.how_out = how_out;
        this.fielder_name = fielder_name;
        this.fielder_id = fielder_id;
        this.bowler_name = bowler_name;
        this.bowler_id = bowler_id;
        this.runs = +runs;
        this.fours = +fours;
        this.sixes =+sixes;
        this.balls = +balls; 
    }


}