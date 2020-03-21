import * as firestore from '@google-cloud/firestore';
import {PlayCricketAPICall} from "./PlayCricketAPICall";

/**
 * Match list import class
 * @functions public importMatchList()
 * @function private updateMatchList()
 * @function private toDate()
 * @function private updateDbFields()
 * @function private isNavestockHomeTeam()
 */


 export class MatchListImport {

    

    constructor(
        private afs = new firestore.Firestore(), 
        private plycrctAPICall = new PlayCricketAPICall()
        ) {}
    /**
     * Retrievs Playcricket matchlist data for a given Season, Playcricket Site with an APIToken as authentication. 
     * After retrieving the Playcricket matchlist data, a firestore batch is ceated with all updates and then comitted.
     * 
     * @param seasonID 
     * @param siteID 
     * @param apiToken 
     */
    public importMatchList(seasonID:string, siteID:string, apiToken:string){

            this.plycrctAPICall.playCricketApiCall(seasonID, siteID, apiToken) //Get data from play cricket
                .then( APIResponse => {
                    this.updateMatchList(APIResponse.body).commit()
                        .catch( err => console.error(err));
                    })
                .catch(err => console.error(err))
    }


    /**
     * Creates a firestore batch of all imported Playcricket matches to be updated/imported
     * @param matchListData 
     * @returns match list 
     */
    private updateMatchList(matchListData: any): firestore.WriteBatch {
        const matchListBatch = this.afs.batch();
        matchListData.matches.forEach(element => {
            const dRef:firestore.DocumentReference = this.afs.doc('Fixtures/' + element.id)
            matchListBatch.set(dRef, this.updateDbFields(element), { merge: true });
        });

        return matchListBatch;
    }

    /**
     * Function toDate(dateStr: string, timeStr?: string)
     * @description Takes a string dd/mm/yyy and converts it to an ISO date
     * @param dateStr dd/mm/yyy
     * @param [timeStr] 
     * @returns ISO date 
     */

     //admin.firestore.Timestamp
    private toDate(dateStr: string, timeStr?: string): firestore.Timestamp{
        const tmpDate: string[] = dateStr.split("/");
        let matchTime: string;

        if (timeStr) {
            matchTime = timeStr;
        } else {
            matchTime = '12:00';
        }

        
        return firestore.Timestamp.fromDate(
            new Date(tmpDate[2] + '-' + tmpDate[1] + '-' + tmpDate[0] + 'T' + matchTime + ':00+01:00')
        );
    }
    
    /**
     * Takes the Playcricket match list data and produces a new object after:
     * @remarks
     * Reformats fields: 'last_updated', 'match_date', 'season' and 'id' attributes.
     * @remarks Adds new attributes: navestock_club_id, navestock_club_name, navestock_team_id, navestock_team_name, opposition_club_id, opposition_club_name, opposition_team_id, opposition_team_name, home_team_isNavestock
     * @param Object Playcricket match list Object 
     * @returns Object of type <any>
     */
    private updateDbFields(element: any): object {

        // set the oposition and navestock team info
        let navestock_club_id: string = ""
        let navestock_club_name: string = ""
        let navestock_team_id: string = ""
        let navestock_team_name: string = ""
        let opposition_club_id: string = ""
        let opposition_club_name: string = ""
        let opposition_team_id: string = ""
        let opposition_team_name: string = ""
        const home_team_isNavestock: boolean = this.isNavestockHomeTeam(element.home_club_id)


        if (home_team_isNavestock === true) {
            navestock_club_id = element.home_club_id;
            navestock_club_name = element.home_club_name;
            navestock_team_id = element.home_team_id;
            navestock_team_name = element.home_team_name;

            opposition_club_id = element.away_club_id;
            opposition_club_name = element.away_club_name;
            opposition_team_id = element.away_team_id;
            opposition_team_name = element.away_team_name;
        } else {
            navestock_club_id = element.away_club_id;
            navestock_club_name = element.away_club_name;
            navestock_team_id = element.away_team_id;
            navestock_team_name = element.away_team_name;

            opposition_club_id = element.home_club_id;
            opposition_club_name = element.home_club_name;
            opposition_team_id = element.home_team_id;
            opposition_team_name = element.home_team_name;
        }
            
        // Add new fields to updatedMatchData object    
        const updateFields: object = {
            'last_updated': this.toDate(element.last_updated),
            'match_date': this.toDate(element.match_date, element.match_time),
            'season': +element.season,
            'id': element.id.toString(),
            'navestock_club_id': navestock_club_id,
            'navestock_club_name': navestock_club_name,
            'navestock_team_id': navestock_team_id,
            'navestock_team_name': navestock_team_name,
            'opposition_club_id': opposition_club_id,
            'opposition_club_name': opposition_club_name,
            'opposition_team_id': opposition_team_id,
            'opposition_team_name': opposition_team_name,
        }
        const updatedMatchData = Object.assign({}, element, updateFields);

        return updatedMatchData;
    }


    /**
     * Determines whether navestock is the home team
     * @param home_club_id 
     * @returns true if navestock home team 
     */
    private isNavestockHomeTeam(home_club_id: string): boolean {
        let returnVal: boolean;
        if (home_club_id === '4513') {
            returnVal = true;
        } else {
            returnVal = false;
        }
        return returnVal;
    }

}
