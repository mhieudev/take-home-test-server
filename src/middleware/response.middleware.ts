import { NextFunction, Request } from 'express'
import { StatusCodes } from 'http-status-codes'

import { AppResponse } from '../common'
import { ObjectUtils, ServerError, TResponse, logger } from '../utils'

export function onResponse(_: Request, res: AppResponse, next: NextFunction) {
  res.onResponse = (result: TResponse<true>) => {
    res.send(result)
  }
  next()
}

export function onError(_: Request, res: AppResponse, next: NextFunction) {
  res.onError = (error: ServerError) => {
    if (error instanceof ServerError) {
      if (!error.status) logger.error('Internal Server Error', error)
      let body: TResponse<false> = {
        success: false,
        errors: { type: error['type'], message: error.status ? error.message : 'INTERNAL_SERVER_ERROR', errors: error.errors },
      }
      if (!ObjectUtils.isEmptyObj(error.errors)) body.errors = error.errors
      res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).send(body)
    } else {
      const body: TResponse<false> = {
        success: false,
        errors: { type: 'InternalError', message: 'INTERNAL_SERVER_ERROR', error },
      }
      logger.error('Internal Server Error', error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(body)
    }
  }
  next()
}
