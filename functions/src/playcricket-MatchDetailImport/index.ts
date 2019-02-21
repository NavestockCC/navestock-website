import * as functions from 'firebase-functions'
import * as request from 'request';
import {MatchDetailImport} from './matchdetail-import';
import * as cors from "cors";

const options:cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: '*',
    preflightContinue: false
  };

 const Cors = cors(options);

export const listener = functions.https.onRequest(async (req, res) => {
    Cors(req, res, () => {
    try{
        const mID: string = req.query.mid;
        const matchImportFunction =  new MatchDetailImport();
        const url:string = "http://play-cricket.com/api/v2/match_detail.json?api_token=b5827cc30a9019c48af36df94eeb386c&match_id=" + mID;
        request({url: url}, function (error, response, body){
            matchImportFunction.getImportData(JSON.parse(body)).then(
                ()=> {
                    res.send('Import Completed')
                }
            ).catch(
                e => console.log(e)
            );
            
        })
      }
      catch (err){
        res.send('error: Could not import PlayCricket Match')
        }
    
    });
    
})
