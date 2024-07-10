import supertest from 'supertest'
import { connectDatabaseTest, cleanDatabaseTest } from '../src/database'
import { app } from '../src/app'

beforeAll(async () => {
  await connectDatabaseTest()
})

afterAll(async () => {
  await cleanDatabaseTest()
})

export const request = () => supertest(app)
