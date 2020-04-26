import { match } from '../../objects/match.object';



export class MatchServices {

    /**
     * Creats match object
     * @param importDataObject 
     * @returns match object 
     */
    public creatMatchObject(importDataObject: any): match {
        const matchObject: match = new match();

        let resultUpdated: boolean = false;
        if (importDataObject.match_details[0].result_description !== '') { resultUpdated = true };
        matchObject.setMatchResult(
            importDataObject.match_details[0].id,
            importDataObject.match_details[0].status,
            importDataObject.match_details[0].published,
            importDataObject.match_details[0].last_updated,
            importDataObject.match_details[0].league_id,
            importDataObject.match_details[0].competition_name,
            importDataObject.match_details[0].competition_id,
            importDataObject.match_details[0].competition_type,
            importDataObject.match_details[0].match_type,
            importDataObject.match_details[0].game_type,
            importDataObject.match_details[0].match_date,
            importDataObject.match_details[0].match_time,
            importDataObject.match_details[0].ground_name,
            importDataObject.match_details[0].ground_id,
            importDataObject.match_details[0].home_club_name,
            importDataObject.match_details[0].home_team_name,
            importDataObject.match_details[0].home_team_id,
            importDataObject.match_details[0].home_club_id,
            importDataObject.match_details[0].away_club_name,
            importDataObject.match_details[0].away_team_name,
            importDataObject.match_details[0].away_team_id,
            importDataObject.match_details[0].away_club_id,
            importDataObject.match_details[0].toss_won_by_team_id,
            importDataObject.match_details[0].toss,
            importDataObject.match_details[0].batted_first,
            resultUpdated,
            this.noHTML(importDataObject.match_details[0].result_description),
            importDataObject.match_details[0].result_applied_to,
            importDataObject.match_details[0].match_notes
        )

        return matchObject;
    }


private noHTML(strInputCode: string):string {
    return strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
}

}