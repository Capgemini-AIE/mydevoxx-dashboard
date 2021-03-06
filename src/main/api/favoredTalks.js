/**
 * Created by SCMORETO on 27/04/2017.
 */

import request from "then-request";

let favoredTalksEndpoint =
  "https://mydevoxx-capgemini-api-router.eu-gb.mybluemix.net/favored";
const mockUuidEndpoint = process.env.REACT_APP_WIREMOCK_SERVER + "/favored";

/**
 * Use mock endpoint outside of live
 */
if (["production", "integration"].indexOf(process.env.NODE_ENV) < 0) {
  favoredTalksEndpoint = mockUuidEndpoint;
}

/**
 * Get the users Favored Talks for the conference
 * @Params uuid
 * @returns {Array of favored talks}
 */
let getFavoredTalks = uuid => {
  return request(
    "GET",
    favoredTalksEndpoint + "/?uuid=" + uuid
  ).then(response => {
    let body = response.getBody();
    return JSON.parse(body);
  });
};

export default {
  getFavoredTalks
};
