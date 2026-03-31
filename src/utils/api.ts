import config from "../config/config";
import type { METHOD, Options } from "../types/api";

export const sendRequest = async (
  route = "/",
  method: METHOD = "GET",
  data: BodyInit | null,
) => {
  const url = "http://" + config.server.host + ":" + config.server.port + route;
  const options: Options = {
    method,
    body: data,
  };

  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    options.headers = {
      authorization: "Bearer " + JSON.parse(jwt),
    };
  }

  const response = await fetch(url, options);

  return response;
};
