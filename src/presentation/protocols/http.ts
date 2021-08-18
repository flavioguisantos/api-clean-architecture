export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  body?: any
  user?: any
  params?: any
  query?: any
}
