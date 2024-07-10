import { Router, Request } from 'express'

import { AppResponse } from '../../common'
import { ZodValidate } from '../../middleware'
import { ToDoListHandler } from './to-do-list.handler'
import { TodoSchema } from './to-do-list.type'

export const toDoListRouter: Router = (() => {
  const router = Router()

  router.get('/', (req, res: AppResponse) => {
    ToDoListHandler.getAll(req.query as any)
      .then(res.onResponse)
      .catch(res.onError)
  })

  router.post('/', ZodValidate(TodoSchema), (req: Request, res: AppResponse) => {
    ToDoListHandler.create(req.body).then(res.onResponse).catch(res.onError)
  })

  router.get('/:id', (req: Request, res: AppResponse) => {
    ToDoListHandler.getById(+req.params.id).then(res.onResponse).catch(res.onError)
  })

  router.put('/:id', ZodValidate(TodoSchema), (req: Request, res: AppResponse) => {
    ToDoListHandler.update(+req.params.id, req.body).then(res.onResponse).catch(res.onError)
  })

  router.delete('/:id', (req: Request, res: AppResponse) => {
    ToDoListHandler.delete(+req.params.id).then(res.onResponse).catch(res.onError)
  })

  return router
})()
