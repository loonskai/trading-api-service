import { Client, Dispatcher } from "undici";

type ApiCredentials = {
  apiKeyId: string;
  apiSecretKey: string;
};

const { API_KEY_ID_HEADER = "", API_SECRET_KEY_HEADER = "" } = process.env;

export class ApiClient extends Client {
  private defaultPath?: string;
  private credentials: ApiCredentials;

  constructor({
    url,
    defaultPath = "",
    options,
    credentials,
  }: {
    url: string;
    defaultPath?: string;
    options?: Client.Options;
    credentials: ApiCredentials;
  }) {
    super(url, options);
    this.defaultPath = defaultPath;
    this.credentials = credentials;
  }

  public override request({
    headers = {},
    path,
    ...options
  }: Dispatcher.RequestOptions) {
    return super.request({
      ...options,
      headers: {
        ...headers,
        [API_KEY_ID_HEADER]: this.credentials.apiKeyId,
        [API_SECRET_KEY_HEADER]: this.credentials.apiSecretKey,
      },
      path: this.defaultPath + path,
    });
  }
}
