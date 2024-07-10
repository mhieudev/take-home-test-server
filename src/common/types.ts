import { Response as ExpressResponse } from 'express'
import { TResponse } from '../utils'

export type TData = { [key in string]?: any }

export interface AppResponse extends ExpressResponse {
  onError?: any
  onResponse?: (result: TResponse<true>) => any
}

export enum ETypeError {
  ServerError = 'ServerError',
  BadRequestError = 'BadRequestError',
  NotFoundError = 'NotFoundError',
}

export interface DatabaseQuery {
  offset?: number
  limit?: number
  q?: string
}
