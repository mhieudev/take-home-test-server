import { Request, Response, NextFunction } from 'express'

import { CONFIG } from '../config'
import { apiLogging } from '../utils'

export const loggingApi = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now()
  const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || ''

  res.on('finish', () => {
    const elapsed = Date.now() - start
    const message = `[ipAddress: ${ipAddress}] ➻❥ Method: ${req.method} ➻❥ Path: ${req.originalUrl} ➻❥ Time: ${elapsed}ms`
    let logFunction = apiLogging.info

    if (CONFIG.ENV !== 'develop') logFunction = elapsed <= 400 ? apiLogging.info : apiLogging.warn

    logFunction(message)
  })

  next()
}
