import { users } from '../helpers/users'
import { User } from '../types/user.types'
import { v4 as uuidv4 } from 'uuid'

export const findAll = () => {
  return new Promise((res, rej) => res(users))
}

export const find = (id: string): Promise<User> => {
  return new Promise((res, rej) => {
    const user = users.find((user) => user.id === id)
    res(user as User)
  })
}

export const add = (user: User) => {
  return new Promise((res, rej) => {
    const newUser = {
      id: uuidv4(),
      ...user,
    }
    users.push(newUser)
    res(newUser)
  })
}

export const update = (id: string, data: User) => {
  return new Promise((res, rej) => {
    const index = users.findIndex((user) => user.id === id)
    users[index] = { id, ...data }
    res(users[index])
  })
}
