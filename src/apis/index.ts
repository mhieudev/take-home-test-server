import { Router } from 'express'

import { AppResponse } from '../common'
import { returnResSuccess } from '../utils'
import { toDoListRouter } from './to-do-list/to-do-list.router'

export const apiRouter: Router = (() => {
  const router = Router()

  router.get('/', (_, res: AppResponse) => res.send(returnResSuccess({ message: 'Server Is Running' })))
  router.get('/ping', (_, res: AppResponse) => res.send(returnResSuccess({ message: 'Pong' })))

  router.use('/to-do-list', toDoListRouter)

  return router
})()
