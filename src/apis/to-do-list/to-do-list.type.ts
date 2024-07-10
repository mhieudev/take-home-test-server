import { z } from 'zod'

import { DatabaseQuery } from '../../common'

export enum EStatusToDo {
  ACTIVATED = 'ACTIVATED',
  ARCHIVED = 'ARCHIVED',
}

export const TodoSchema = z
  .object({
    name: z.string().max(80, { message: 'Must be maximum length of 80 characters' }),
    startDate: z.string().date().optional(),
    endDate: z.string().date().optional(),
  })
  .refine((data: any) => !data.endDate || data.startDate, {
    message: 'Start date must be present if there is an end date',
    path: ['endDate'],
  })

export interface ToDoQuery extends DatabaseQuery {
  name: string
  showAll: boolean
}
