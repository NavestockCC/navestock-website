import { Pipe, PipeTransform } from '@angular/core';
import {scorecard} from './scorecard.object';

@Pipe({
    name: 'HasBowled'
})

export class HasBowled implements PipeTransform {
    transform(allScoreCard: scorecard[]) {
        if(allScoreCard != null){
            let i:number = 0;
            return allScoreCard.filter(sc => sc.oversBowled > 0 ) 
        }
}
}
