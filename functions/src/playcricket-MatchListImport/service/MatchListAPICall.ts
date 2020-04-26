import * as http from "http"
import { Observable } from 'rxjs';
import * as playcricketCert from "../../environments/PlayCricket";

const playcricketCredentials = {
    "apitoken" : playcricketCert.firebaseAuthData.api_token,
    "site_id" : playcricketCert.firebaseAuthData.site_id
}

export class PlayCricketMatchListAPICall {

    public playCricketApiCall(seasonID: string): Observable<any> {
        const httpOptions = {
            method: 'get',
            protocol: 'http:',
            hostname: 'play-cricket.com',
            path: '/api/v2/matches.json?site_id=' + playcricketCredentials.site_id + '&season=' + seasonID +'&api_token=' + playcricketCredentials.apitoken
        };
    
        return new Observable(
            observer => {
                http.get(httpOptions, (res) => {
    
                    const { statusCode } = res;
                    console.info("PlayCricket API Call status: " + statusCode );
                    const contentType = res.headers['content-type'];

                    let error;
                    if (statusCode !== 200) {
                        error = new Error('E_http_1: Request Failed.\n' +
                            `Status Code: ${statusCode}`);
                    } else if (!/^application\/json/.test(contentType)) {
                        error = new Error('E_http_2: Invalid content-type.\n' +
                            `Expected application/json but received ${contentType}`);
                    }
                    if (error) {
                        console.error(error.message);
                        // Consume response data to free up memory
                        res.resume();
                    }
    
                    res.setEncoding('utf8');
                    let rawData = '';
                    res.on('data', (chunk) => { rawData += chunk; });
                    res.on('end', () => {
                        try {
                            observer.next(rawData);
                            observer.complete();
                        } catch (e) {
                            console.error('E_http_3: ${e.message}');
                        }
                    });
                }).on('error', (e) => {
                    observer.error(e.message)
                    console.error(`E_http_4: Got error: ${e.message}`);
                });
            }
        )
    }
    
}