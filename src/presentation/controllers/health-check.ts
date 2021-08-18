import { ok } from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../protocols'

export class HealthCheckController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return await Promise.resolve(ok('Application is running!'))
  }
}

export namespace HealthCheckController {
  export interface Request {

  }
}
