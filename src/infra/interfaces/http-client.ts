export interface HttpClient {
  post: (input: HttpPost) => Promise<any>;
}

export interface HttpPost {
  url: string;
  data?: any;
  params: object;
}
