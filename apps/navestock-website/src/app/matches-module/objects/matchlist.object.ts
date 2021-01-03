import * as firebase from 'firebase/app'

export class matchItem {
id: number;
status: string;
published: string;
last_updated:string;
league_name?: string;
league_id?: string;
competition_name?: string;
competition_id?: string;
competition_type?: string;
match_type?: string;
game_type?: string;
season: string;
match_date: string;
match_time: string;
ground_name?: string;
ground_id?: string;
ground_latitude?: string;
ground_longitude?: string;
home_club_name: string;
home_team_name: string;
home_team_id: string;
home_club_id: string;
away_club_name: string;
away_team_name: string;
away_team_id: string;
away_club_id: string;
umpire_1_name?: string;
umpire_1_id?: string;
umpire_2_name?: string;
umpire_2_id?: string;
umpire_3_name?: string;
umpire_3_id?: string;
referee_name?: string;
referee_id?: string;
scorer_1_name?: string;
scorer_1_id?: string;
scorer_2_name?: string;
scorer_2_id?: string;

constructor() {}


    /*
        Takes a string dd/mm/yyy and converts it to an ISO date
    */
   public  toTimestap(dateStr: string, timeStr?: string): firebase.default.firestore.Timestamp {
    const tmpDate: string[] = dateStr.split('/');
    
    if (timeStr == null || timeStr === '') {
        timeStr = '12:00';
    }
    const tmpTime: string[] = timeStr.split(':');

    const ND: number = Date.UTC(Number(tmpDate[2]), Number(tmpDate[1]), Number(tmpDate[0]), Number(tmpTime[0]), Number(tmpTime[1]), 0);
    return firebase.default.firestore.Timestamp.fromMillis(ND);
}
}