import {match} from './objects/match.object';


export class MatchsPerMonth {
    month: number;
    monthName: string;
    year: number;
    matchArray: match[] = [];

    constructor(matchToAdd: match) {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const md: Date = matchToAdd.match_date.toDate();
        this.month = md.getMonth();
        this.monthName = monthNames[this.month];
        this.year = md.getFullYear();
        this.matchArray.push(matchToAdd);
      }

    public addMatch(matchToAdd: match) {
        this.matchArray.push(matchToAdd);
    }
}
