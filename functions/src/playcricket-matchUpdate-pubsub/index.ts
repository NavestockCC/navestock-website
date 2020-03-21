import * as functions from 'firebase-functions'

/** Navestock Classes */

import { MatchListImport } from './matchListImport';

export const playcricketGetMatchList = functions.pubsub
    .topic('Match_List_Import')
    .onPublish( msgPayload => {
        const matchListImportFunctions = new MatchListImport();
        try {
            const seasonID: string = msgPayload.json.season;
            const siteID: string = msgPayload.json.siteid;
            const apiToken: string = msgPayload.json.apitoken;

            matchListImportFunctions.importMatchList(seasonID, siteID, apiToken) //Get data from play cricket

        } catch (error) {
            console.error(error);
        }
    });