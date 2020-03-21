import * as requestpromisenative from 'request-promise-native';

export class PlayCricketAPICall {

    public playCricketApiCall(seasonID:string, siteID:string, apiToken:string):Promise<any>{

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
    }
    
}