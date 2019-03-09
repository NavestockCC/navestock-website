import * as requestpromisenative from 'request-promise-native';

export class PlayCricketAPICall {

    public playCricketApiCall(seasonID:string):Promise<any>{

        const requestPrimiseOptions = {
            uri: 'http://play-cricket.com/api/v2/matches.json',
            qs: {
                site_id: '4513',
                api_token: 'b5827cc30a9019c48af36df94eeb386c',
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