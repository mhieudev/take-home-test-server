import { request } from './app-test'

describe('To Do List Apis', () => {
  it('Ping Success', async () => {
    const response = await request().get('/ping')
    expect(response.statusCode).toEqual(200)
  })

  describe('To Do List Feature', () => {
    it('Create To Do Success', async () => {
      const response = await request().post('/to-do-list').send({
        name: 'abc',
        startDate: '2024-07-01',
        endDate: '2024-07-11',
      })

      expect(response.statusCode).toEqual(200)
    })

    it('Create To Do Failure', async () => {
      const response = await request().post('/to-do-list').send({
        name: 'abc',
        startDate: '2024-07-1',
        endDate: '2024-07-1',
      })

      expect(response.statusCode).not.toEqual(200)
    })

    it('Get To Do By Id Success', async () => {
      const response = await request().get(`/to-do-list/${1}`)
      expect(response.statusCode).toEqual(200)
    })

    it('Get To Do By Id Failure', async () => {
      const response = await request().get(`/to-do-list/${-1}`)
      expect(response.statusCode).not.toEqual(200)
    })

    it('Update To Do Success', async () => {
      const response = await request().put(`/to-do-list/${1}`).send({ name: 'abcxyz', startDate: '2024-07-01', endDate: '2024-07-11' })
      expect(response.statusCode).toEqual(200)
    })

    it('Update To Do By Id Failure', async () => {
      const response = await request().get(`/to-do-list/${-1}`).send({ name: 'abcxyz', startDate: '2024-07-1', endDate: '2024-07-11' })
      expect(response.statusCode).not.toEqual(200)
    })

    it('Delete To Do By Id Success', async () => {
      const response = await request().delete(`/to-do-list/${1}`)
      expect(response.statusCode).toEqual(200)
    })

    it('Delete To Do By Id Failure', async () => {
      const response = await request().delete(`/to-do-list/${-1}`)
      expect(response.statusCode).not.toEqual(200)
    })

    it('Get List To Do Success', async () => {
      const response = await request().get(`/to-do-list`)
      expect(response.statusCode).toEqual(200)
    })
  })
})
