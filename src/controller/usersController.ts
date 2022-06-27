import { IncomingMessage, ServerResponse } from 'http'
import { add, find, findAll, update, remove } from '../models/usersModel'
import { User } from '../types/user.types'

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await findAll()

    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(JSON.stringify(users))
  } catch (error) {
    console.error(error)
  }
}

export const getUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    const user = await find(id)

    if (user) {
      res.writeHead(200, { 'Content-type': 'application/json' })
      res.end(JSON.stringify(user))
    } else {
      res.writeHead(404, { 'Content-type': 'application/json' })
      res.end(JSON.stringify({ message: 'User not found' }))
    }
  } catch (error) {
    console.error(error)
  }
}

export const addUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const buffers: Uint8Array[] = []

    for await (const chunk of req) {
      buffers.push(chunk)
    }

    const data = Buffer.concat(buffers).toString()
    const { username, age, hobbies } = JSON.parse(data)

    if (username && age && hobbies) {
      const user: User = {
        username,
        age,
        hobbies,
      }

      const newUser = await add(user)
      res.writeHead(201, { 'Content-type': 'application/json' })
      res.end(JSON.stringify(newUser))
    } else {
      res.writeHead(400, { 'Content-type': 'application/json' })
      res.end(JSON.stringify({ message: "Body doesn't contain requirement fields" }))
    }
  } catch (error) {
    console.error(error)
  }
}

export const updateUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    const user = await find(id)

    if (user) {
      const buffers: Uint8Array[] = []

      for await (const chunk of req) {
        buffers.push(chunk)
      }

      const data = Buffer.concat(buffers).toString()
      const { username, age, hobbies } = JSON.parse(data)

      const updUser = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      }

      const updatedUser = await update(id, updUser)
      res.writeHead(200, { 'Content-type': 'application/json' })
      res.end(JSON.stringify(updatedUser))
    } else {
      res.writeHead(404, { 'Content-type': 'application/json' })
      res.end(JSON.stringify({ message: 'User not found' }))
    }
  } catch (error) {
    console.error(error)
  }
}

export const deleteUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    const user = await find(id)

    if (user) {
      await remove(id)
      res.writeHead(204, { 'Content-type': 'application/json' })
      res.end()
    } else {
      res.writeHead(404, { 'Content-type': 'application/json' })
      res.end(JSON.stringify({ message: 'User not found' }))
    }
  } catch (error) {
    console.error(error)
  }
}
