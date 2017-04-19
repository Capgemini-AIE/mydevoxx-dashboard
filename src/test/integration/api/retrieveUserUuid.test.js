/**
 * Created by SCMORETO on 19/04/2017.
 */

import retrieveUuid from "../../../main/api/retrieveUuid";
import wiremockAPI from "./wiremock/wiremockApi";
import uuidMapping from "./wiremock/mappings/uuidMapping";
import notFound from "./wiremock/mappings/notFoundSpeaker.json";
import {UnexpectedErrorException, UnexpectedSuccessException, MappingSetupException} from "./testingErrors";
import {raiseOrPassError, expectNotFoundOrRethrowError} from "./testingHelpers";

/**
 * Set up wiremock with normal speaker api response
 */
let normalSetup = () => {
    return wiremockAPI.postMapping(uuidMapping);
};


describe('getUUID', () => {
    it('should return a UUID', () => {
        return retrieveUuid.getUUID().then((result) => {
                expect(result).toEqual(
                    '26667c9fdcc603ee93b43fb3e780b07378695a86'
                )
            }, (error) => {
                raiseOrPassError("UnexpectedErrorException", "Unexpected error on \"getUUID\" after \"normalSetup\"", error);
            })
            .catch((error) => {
                console.error(error);
                throw error;
            })
    });
});


/**
 * Set up wiremock with 404 response
 */
// let notFoundSetup = () => {
//     return wiremockAPI.postMapping(notFound);
// };