/**
 * Created by SCMORETO on 30/03/2017.
 */
import request from "then-request";

let endpoint = process.env.REACT_APP_WIREMOCK_SERVER + "/__admin/mappings";

/**
 * GET a reformatted array of all speakers at the conference
 * @returns (Array) {)
 */
let postMapping = mapping => {
  return request("POST", endpoint, { json: mapping }).then(response => {
    return { status: response.status, body: JSON.parse(response.body) };
  });
};

export default {
  postMapping: postMapping
};
