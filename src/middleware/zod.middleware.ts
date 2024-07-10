import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

import { TResponse } from '../utils'
import { StatusCodes } from 'http-status-codes'

export const ZodValidate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const body: TResponse<false> = { success: false, errors: { error } }
        return res.status(StatusCodes.BAD_REQUEST).json(body)
      }
      next(error)
    }
  }
}
