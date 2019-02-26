import * as functions from 'firebase-functions'
import * as request from 'request';
import * as cors from "cors";

import { match } from '../objects/match.object';
import { MatchListImport } from './matchListImport'

const options: cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: '*',
    preflightContinue: false
};

const Cors = cors(options);

export const matchListImport = functions.https.onRequest(async (req, res) => {
    const matchList: match[] = [];
    const matchListFunction = new MatchListImport();

    Cors(req, res, () => {
        try {
            if (req.query.season === undefined) {
                res.send('season param not found');
            } else {
                const seasonID: string = req.query.season;
                const url: string = "http://play-cricket.com/api/v2/matches.json?site_id=4513&api_token=b5827cc30a9019c48af36df94eeb386c&season=" + seasonID;
                request({ url: url }, (error, response, body) => {
                    const bodyObject = JSON.parse(body);
                    bodyObject.matches.forEach(matchElement => {
                        matchList.push(matchListFunction.getMatchDetails(matchElement));
                    });
                    matchListFunction.updateMatchList(matchList);
                    res.send('Import Complete');
                })
            }
        }
        catch (err) {
            res.send('error: ' + err);
        }
    })
});