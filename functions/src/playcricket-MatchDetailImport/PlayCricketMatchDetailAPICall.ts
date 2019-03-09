import * as requestpromisenative from 'request-promise-native';

export class PlayCricketMatchDetailAPICall {

    public playCricketApiCall(matchID:string):Promise<any>{

        const requestPrimiseOptions = {
            uri: 'http://play-cricket.com/api/v2/match_detail.json',
            qs: {
                api_token: 'b5827cc30a9019c48af36df94eeb386c',
                match_id: matchID
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