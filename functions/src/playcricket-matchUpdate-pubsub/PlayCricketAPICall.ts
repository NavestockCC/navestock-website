  //FIXME: Uncomment to move back to production
    // import * as requestpromisenative from 'request-promise-native';

  import {playcricketdata} from './playcricketdata';  

export class PlayCricketAPICall {

    public playCricketApiCall(seasonID:string, siteID:string, apiToken:string):Promise<any>{
  
        //FIXME: Uncomment to move back to production
        /** origional code to get data from play cricket.
        const requestPrimiseOptions = {
            uri: 'http://play-cricket.com/api/v2/matches.json',
            qs: {
                site_id: siteID,
                api_token: apiToken,
                season: seasonID
            },
            headers: {
                'User-Agent': 'Request-Promise',
            },
            json: true,
            resolveWithFullResponse: true
        };
        
      
        return requestpromisenative(requestPrimiseOptions);
         */

       //FIXME: Remove to move back to production
       return new Promise( (resolve, reject) => {
            const fakeData = new playcricketdata();
            resolve(fakeData.data);
        })
    }
    
}