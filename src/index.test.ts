import request from 'supertest'
import server from './index'
import { User } from './types/user.types'

const user: User = {
  username: 'Rasul',
  age: 20,
  hobbies: [],
}

const newUser: User = {
  username: 'username',
  age: 30,
  hobbies: ['coding', 'basketball'],
}

const userWithoutField = {
  username: 'aida',
  age: 21,
}

const userWithAnotherKey = {
  ...newUser,
  gender: 'male',
}

describe('first', () => {
  afterAll(() => server.close())
  let id: string
  it('GET empty array', async () => {
    const res = await request(server).get('/api/users')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(0)
  })
  it('POST new User', async () => {
    const res = await request(server).post('/api/users').send(user)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.username).toBe('Rasul')
    expect(res.body.age).toBe(20)
    expect(res.body.hobbies).toStrictEqual([])
  })
  it('GET User by ID', async () => {
    const res = await request(server).get(`/api/users/${id}`)
    expect(res.status).toBe(200)
    expect(res.body.username).toBe('Rasul')
    expect(res.body.age).toBe(20)
    expect(res.body.hobbies).toStrictEqual([])
  })
  it('PUT User', async () => {
    const res = await request(server).put(`/api/users/${id}`).send(newUser)
    expect(res.status).toBe(200)
    expect(res.body.username).toBe('username')
    expect(res.body.age).toBe(30)
    expect(res.body.hobbies).toStrictEqual(['coding', 'basketball'])
  })
  it('DELETE User', async () => {
    const res = await request(server).delete(`/api/users/${id}`)
    expect(res.status).toBe(204)
  })
  it('GET deleted User by ID', async () => {
    const res = await request(server).delete(`/api/users/${id}`)
    expect(res.status).toBe(404)
  })
})

describe('second', () => {
  let id: string
  it('GET with not valid ID', async () => {
    const res = await request(server).get(`/api/users/123123`)
    expect(res.status).toBe(400)
    expect(res.body).toStrictEqual({ message: 'ID is not valid' })
  })
  it('POST without required field', async () => {
    const res = await request(server).post('/api/users').send(userWithoutField)
    expect(res.status).toBe(400)
    expect(res.body).toStrictEqual({ message: "Body doesn't contain requirement fields" })
  })
  it('POST User', async () => {
    const res = await request(server).post('/api/users').send(user)
    expect(res.status).toBe(201)
    expect(res.body.username).toBe('Rasul')
    expect(res.body.age).toBe(20)
    expect(res.body.hobbies).toStrictEqual([])
  })
  it('GET all Users length', async () => {
    const res = await request(server).get('/api/users')
    expect(res.body).toHaveLength(1)
  })
  it('GET User with does not exist ID', async () => {
    const res = await request(server).get(`/api/users/efd4c062-6c5f-4197-b1c8-5689930be983`)
    expect(res.status).toBe(404)
    expect(res.body).toStrictEqual({ message: 'User not found' })
  })
  it('PUT with not valid ID', async () => {
    const res = await request(server).put('/api/users/123123')
    expect(res.status).toBe(400)
    expect(res.body).toStrictEqual({ message: 'ID is not valid' })
  })
})

describe('third', () => {
  it('PUT does not exist user', async () => {
    const res = await request(server).put('/api/users/efd4c062-6c5f-4197-b1c8-5689930be983')
    expect(res.status).toBe(404)
    expect(res.body).toStrictEqual({ message: 'User not found' })
  })
  it('DELETE User with wrong ID', async () => {
    const res = await request(server).delete('/api/users/123123')
    expect(res.status).toBe(400)
    expect(res.body).toStrictEqual({ message: 'ID is not valid' })
  })
  it('DELETE does not exist user', async () => {
    const res = await request(server).delete(`/api/users/efd4c062-6c5f-4197-b1c8-5689930be983`)
    expect(res.status).toBe(404)
    expect(res.body).toStrictEqual({ message: 'User not found' })
  })
  it('Wrong route', async () => {
    const res = await request(server).get('/hello/world')
    expect(res.status).toBe(404)
    expect(res.body).toStrictEqual({ message: 'Route not found' })
  })
  it('POST User with another key', async () => {
    const res = await request(server).post('/api/users').send(userWithAnotherKey)
    expect(res.status).toBe(201)
    expect(res.body).not.toStrictEqual(userWithAnotherKey)
  })
  it('GET User length', async () => {
    const res = await request(server).get('/api/users')
    expect(res.body).toHaveLength(2)
  })
})
