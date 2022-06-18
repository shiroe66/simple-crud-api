import { users } from '../helpers/users'
import { User } from '../types/user.types'
import { v4 as uuidv4 } from 'uuid'

export const findAll = () => {
  return new Promise((res, rej) => res(users))
}

export const find = (id: string) => {
  return new Promise((res, rej) => {
    const user = users.find((user) => user.id === id)
    res(user)
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
