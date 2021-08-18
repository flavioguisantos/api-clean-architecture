import { ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

import { LogControllerDecorator } from './log-controller-decorator'
import { LogErrorRepository } from '@/data/protocols/log-error-repository'

class ControllerSpy implements Controller {
  httpRequest: HttpRequest
  httpResponse: HttpResponse = ok('Application is running!')

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.httpRequest = httpRequest
    return await Promise.resolve(this.httpResponse)
  }
}

class LogErrorRepositorySpy implements LogErrorRepository {
  stack: string

  async logError (stack: string): Promise<void> {
    this.stack = stack
  }
}

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

interface SutTypes {
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
  sut: Controller
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    controllerSpy,
    logErrorRepositorySpy,
    sut
  }
}

describe('LogController Decorator', () => {
  test('Should call cobntroller handle', async () => {
    const { controllerSpy, sut } = makeSut()
    const request = null
    await sut.handle(request)
    expect(controllerSpy.httpRequest).toEqual(request)
  })

  test('Should returns the same result of the controller', async () => {
    const { controllerSpy, sut } = makeSut()
    const request = null
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { controllerSpy, logErrorRepositorySpy, sut } = makeSut()
    const serverError = makeFakeServerError()
    controllerSpy.httpResponse = serverError
    const request = null
    await sut.handle(request)
    expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
  })
})
