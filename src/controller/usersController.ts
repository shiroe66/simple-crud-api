import { IncomingMessage, ServerResponse } from "http"
import { find, findAll } from "../models/usersModel"

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await findAll()

    res.writeHead(200, { "Content-type": "application/json" })
    res.end(JSON.stringify(users))
  } catch (error) {
    console.error(error)
  }
}

export const getUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) => {
  try {
    const user = await find(id)

    if (user) {
      res.writeHead(200, { "Content-type": "application/json" })
      res.end(JSON.stringify(user))
    } else {
      res.writeHead(400, { "Content-type": "application/json" })
      res.end(JSON.stringify({ message: "User not found" }))
    }
  } catch (error) {
    console.error(error)
  }
}
