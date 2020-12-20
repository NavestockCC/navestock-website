import { Pipe, PipeTransform } from '@angular/core';
import { fromTask } from '@angular/fire/storage';
import { match } from '../../objects/match.object';

@Pipe({
  name: 'matchwidgetdata',
})
export class MatchwidgetdataPipe implements PipeTransform {
  transform(value: match[]): {teamName: string, matchList?:match[]}[] {
    const newArr:{teamName: string, matchList?:match[]}[] = [];
    if (Array.isArray(value)) {
      const arrayOfNavestockTeams = value.map(
        (object) => object.navestock_team_name
      );
      const setOfNavestockTeams = new Set(arrayOfNavestockTeams);

      setOfNavestockTeams.forEach((setObj) => {
        const filteredTeam = value.filter(
          (filteredTeamObj) => filteredTeamObj.navestock_team_name === setObj
        );
        newArr.push({ teamName: setObj, matchList: filteredTeam.sort((a, b) => {return a.match_date.nanoseconds - b.match_date.nanoseconds}) });
      });
    }
    else{
      newArr.push({teamName: 'No Scheduled Fixtures'})
    }
    return newArr;
  }
}
