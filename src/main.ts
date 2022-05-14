import { apiClient, papersApiClient } from "./clients";
import { startServer } from "./server";

(async () => {
  const accountResponse = await apiClient.request({
    method: "GET",
    path: "/account",
  });
  const accountJson = await accountResponse.body.json();
  console.log(accountJson);

  const paperAccountResponse = await papersApiClient.request({
    method: "GET",
    path: "/account",
  });
  const paperAccountJson = await paperAccountResponse.body.json();
  console.log(paperAccountJson);

  startServer();
})();
