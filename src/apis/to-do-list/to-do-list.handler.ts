import { z } from 'zod'

import { NotFoundError, ValidateID, returnResSuccess } from '../../utils'
import { ErrorMessage } from '../../common'
import { databaseSource } from '../../database'
import { ToDoListEntity } from './to-do-list.entity'
import { EStatusToDo, ToDoQuery, TodoSchema } from './to-do-list.type'

const ToDoListRepo = databaseSource.getRepository(ToDoListEntity)

export class ToDoListHandler {
  static async getAll(queries: ToDoQuery) {
    let { limit, offset, name, showAll } = queries
    let where: any = {}
    if (!showAll) where['status'] = EStatusToDo.ACTIVATED
    if (name) where['name'] = name

    if (!offset) offset = 0
    if (!limit) limit = limit || 20

    const data = await ToDoListRepo.findAndCount({ where, skip: +offset, take: +limit })

    return returnResSuccess({ count: data[1], data: data[0] })
  }

  static async getById(id: number | string) {
    const transformID = ValidateID(id)
    const checkRecord = await ToDoListRepo.findOne({ where: { id: transformID } })
    if (!checkRecord) throw new NotFoundError('Record not found')
    return returnResSuccess(checkRecord)
  }

  static async create(payload: z.infer<typeof TodoSchema>) {
    const newRecord = new ToDoListEntity()
    newRecord.name = payload.name
    newRecord.startDate = payload.startDate
    newRecord.endDate = payload.endDate

    await ToDoListRepo.save(newRecord)
    return returnResSuccess(newRecord)
  }

  static async update(id: number, payload: z.infer<typeof TodoSchema>) {
    const record = await this.getById(id)

    const updateRecord = record.data
    updateRecord.name = payload.name
    updateRecord.startDate = payload.startDate
    updateRecord.endDate = payload.endDate

    const result = await ToDoListRepo.save(updateRecord)
    return returnResSuccess(result)
  }

  static async delete(id: number) {
    const record = await this.getById(id)
    const updateRecord = record.data

    updateRecord.status = EStatusToDo.ARCHIVED
    await ToDoListRepo.save(updateRecord)

    return returnResSuccess({ msg: ErrorMessage.RECORD_DELETED })
  }
}
