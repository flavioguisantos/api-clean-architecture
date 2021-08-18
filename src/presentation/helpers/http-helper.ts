import { HttpResponse } from '../protocols'
import { ServerError, UnauthorizedError, UnprocessableEntity } from '../errors'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const unprocessableEntity = (error: string): HttpResponse => ({
  statusCode: 422,
  body: new UnprocessableEntity(error)
})


export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const putUpdate = (): HttpResponse => ({
  statusCode: 200,
  body: { message: "Feature updated successfully!" }
})
