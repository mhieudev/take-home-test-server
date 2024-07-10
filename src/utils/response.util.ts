import { StatusCodes } from 'http-status-codes'

import { ETypeError, TData } from '../common'

export type TResponse<Success extends boolean> = Success extends true ? { success: true; data: TData } : { success: false; errors: TData }

export const returnResSuccess = (data: TData) => {
  const result: TResponse<true> = { success: true, data: data }
  return result
}

export class ServerError extends Error {
  type: string
  status: number | undefined
  errors: any
  constructor(msg: string, status?: number, errors?: any) {
    super(msg)
    if (status) this.status = status
    this.errors = errors || {}
    this.type = ETypeError.ServerError
  }
}

export class BadRequestError extends ServerError {
  constructor(msg: string, errors?: any) {
    super(msg, StatusCodes.BAD_REQUEST, errors)
    this.type = ETypeError.BadRequestError
  }
}

export class NotFoundError extends ServerError {
  constructor(msg: string, errors?: any) {
    super(msg, StatusCodes.NOT_FOUND, errors)
    this.type = ETypeError.NotFoundError
  }
}
