import { ApiClient } from "./ApiClient";

const {
  API_MARKETS_URI = "",
  API_KEY_ID = "",
  API_SECRET_KEY = "",
  PAPER_API_MARKETS_URI = "",
  PAPER_API_KEY_ID = "",
  PAPER_API_SECRET_KEY = "",
  DATA_API_URI = "",
} = process.env;

export const apiClient = new ApiClient({
  url: API_MARKETS_URI,
  defaultPath: "/v2",
  credentials: {
    apiKeyId: API_KEY_ID,
    apiSecretKey: API_SECRET_KEY,
  },
});
export const papersApiClient = new ApiClient({
  url: PAPER_API_MARKETS_URI,
  defaultPath: "/v2",
  credentials: {
    apiKeyId: PAPER_API_KEY_ID,
    apiSecretKey: PAPER_API_SECRET_KEY,
  },
});
export const stocksApiClient = new ApiClient({
  url: DATA_API_URI,
  defaultPath: "/v2",
  credentials: {
    apiKeyId: "",
    apiSecretKey: "",
  },
});
export const cryptoApiClient = new ApiClient({
  url: DATA_API_URI,
  defaultPath: "/v1beta1/crypto",
  credentials: {
    apiKeyId: "",
    apiSecretKey: "",
  },
});
