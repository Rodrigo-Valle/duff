export interface HttpClient {
  post: (input: HttpPost) => Promise<any>;
  get: (input: HttpGet) => Promise<any>;
}

export interface HttpPost {
  url: string;
  data?: any;
  params: object;
}

export interface HttpGet {
  url: string;
  params: object;
}
