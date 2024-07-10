import { DataSource } from 'typeorm'
import { logger } from '../utils'
import { ToDoListEntity } from '../apis/to-do-list/to-do-list.entity'

export const entities = [ToDoListEntity]

export const databaseSource = new DataSource({
  type: 'sqlite',
  database: 'src/database/db_dev.sqlite',
  entities: entities,
  synchronize: true,
  logging: false,
})

export const databaseSourceTest = new DataSource({
  type: 'sqlite',
  database: 'src/database/db_test.sqlite',
  entities: entities,
  synchronize: true,
  logging: false,
})

export const connectDatabase = async () => {
  await databaseSource
    .initialize()
    .then(() => logger.info('Database connected.'))
    .catch((error) => {
      logger.error(`Database connect failed.`, error)
      process.exit(1)
    })
}

export const connectDatabaseTest = async () => {
  await databaseSource
    .initialize()
    .then(() => logger.info('Database connected.'))
    .catch((error) => {
      logger.error(`Database connect failed.`, error)
      process.exit(1)
    })
}

export const cleanDatabaseTest = async () => {
  await databaseSource
    .dropDatabase()
    .then(() => logger.info('Database cleaned.'))
    .catch((error) => {
      logger.error(`Database cleaned failed.`, error)
      process.exit(1)
    })

  await databaseSource.synchronize()
}
