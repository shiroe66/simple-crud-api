import { users } from "../helpers/users"

export const findAll = () => {
  return new Promise((res, rej) => res(users))
}

export const find = (id: string) => {
  return new Promise((res, rej) => {
    const user = users.find((user) => user.id === id)
    res(user)
  })
}
