import speaker from "../../../main/api/speaker";
import wiremockAPI from "./wiremock/wiremock-api";
import speakerMapping from "./wiremock/mappings/speaker"
import notFound from "./wiremock/mappings/notFoundSpeaker.json";

/**
 * Set up wiremock with normal speaker api response
 */
let normalSetup = () => {
    return wiremockAPI.postMapping(speakerMapping);
};

/**
 * Set up wiremock with 404 response
 */
let notFoundSetup = () => {
    return wiremockAPI.postMapping(notFound);
};

describe('getSpeaker', () => {
    it('should return speaker data and handle a 404', () => {
        return normalSetup().then(speaker.getSpeaker("695b40d928dd0a905b7ab1b900b5a5752870a7d8"))
            .then((result) => {
                expect(result[0]).toEqual({
                    uuid: '695b40d928dd0a905b7ab1b900b5a5752870a7d8',
                    firstName: 'Helen',
                    lastName: 'Beal',
                    avatarUrl: 'https://media.licdn.com/media/p/2/000/10f/320/3b9da1f.jpg',
                    company: 'Ranger4',
                    twitter: '@helenranger4',
                    blog: 'www.ranger4.com',
                    track: 'Methodology Culture'
                })
            }, (error) => {
                expect(true).toBe(false);
            }).then(notFoundSetup).then(speaker.getSpeaker("BB2")).then((result) => {
                expect(true).toBe(false);
            }).catch((error) => {
                if (error.statusCode) {
                    expect(error.statusCode).toEqual(404);
                } else {
                    expect(true).toBe(false);
                }
            });
    });
});