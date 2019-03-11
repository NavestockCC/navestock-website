import * as functions from 'firebase-functions'
import * as cors from "cors";


/** Navestock Classes */
import {PlayCricketAPICall} from "./PlayCricketAPICall";
import {MatchListImport} from "./matchListImport";

/**Cors Import */
const options: cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: '*',
    preflightContinue: false
};

const Cors = cors(options);

export const matchListImport = functions.https.onRequest(async (req, res) => {
    const playcricketAPICall = new PlayCricketAPICall();
    const matchListImportFunctions = new MatchListImport();

    Cors(req, res, () => {
        try {
            if (req.query.season === undefined) {
                res.send({"API call status" : "season param not found"});
            } else {
                const seasonID: string = req.query.season;
                playcricketAPICall.playCricketApiCall(seasonID) //Get data from play cricket
                .then( APIResponse => {
                    matchListImportFunctions.updateMatchList(APIResponse.body);
                    res.send({"API call status" : APIResponse.statusCode});
                    })
                .catch( err => {console.error(err)})    
            }
        }
        catch (err) {
            res.send({"error" : err });
        }
    })
});