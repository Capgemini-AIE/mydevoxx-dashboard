/**
 * Created by SCMORETO on 26/04/2017.
 */

import request from "then-request";

let scheduledTalksEndpoint =
  "https://mydevoxx-capgemini-api-router.eu-gb.mybluemix.net/scheduled";
const mockUuidEndpoint = process.env.REACT_APP_WIREMOCK_SERVER + "/scheduled";

/**
 * Use mock endpoint outside of live
 */
if (["production", "integration"].indexOf(process.env.NODE_ENV) < 0) {
  scheduledTalksEndpoint = mockUuidEndpoint;
}

/**
 * Get the users Scheduled Talks for the conference
 * @Params uuid
 * @returns {UUID}
 */
let getScheduledTalks = uuid => {
  return request(
    "GET",
    scheduledTalksEndpoint + "/?uuid=" + uuid
  ).then(response => {
    let body = response.getBody();
    return JSON.parse(body);
  });
};

export default {
  getScheduledTalks
};
