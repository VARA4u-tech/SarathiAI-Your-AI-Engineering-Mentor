import server from "../../dist/server/server.js";

export const onRequest = async ({ request }) => {
  return server.default.fetch(request);
};
