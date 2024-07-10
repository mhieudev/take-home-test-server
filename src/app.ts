import express, { NextFunction, Request, Response, json } from 'express'
import cors from 'cors'
import { ReasonPhrases } from 'http-status-codes'

import { logger } from './utils'
import { loggingApi, onError, onResponse } from './middleware'
import { ErrorMessage } from './common'
import { apiRouter } from './apis'

export const app = express()

app.use(cors())
app.use(json())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use(loggingApi)
app.use(onError)
app.use(onResponse)

app.use(apiRouter)

app.use((_, res) => res.status(404).send({ success: false, errors: { message: ErrorMessage.INVALID_ROUTE } }))

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Internal Server Error', error.stack)
  res.status(500).send({ success: false, errors: { message: ReasonPhrases.INTERNAL_SERVER_ERROR } })
})
