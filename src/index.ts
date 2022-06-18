import 'dotenv/config'
import { createServer } from 'http'
import { getUser, getUsers, addUser, updateUser } from './controller/usersController'
import { isValidId } from './helpers/isValidId'
import { parseURL } from './helpers/parseURL'

const server = createServer((req, res) => {
  const url = parseURL(req.url as string)

  if (url === '/api/users' && req.method === 'GET') {
    getUsers(req, res)
  } else if (url.match(new RegExp(/^\/api\/users\/[\w-]+$/)) && req.method === 'GET') {
    const id = url.split('/').pop() as string

    if (isValidId(id)) {
      getUser(req, res, id)
    } else {
      res.writeHead(400, { 'Content-type': 'application/json' })
      res.end(JSON.stringify({ message: 'Route not found' }))
    }
  } else if (url === '/api/users' && req.method === 'POST') {
    addUser(req, res)
  } else if (url.match(new RegExp(/^\/api\/users\/[\w-]+$/)) && req.method === 'PUT') {
    const id = url.split('/').pop() as string

    if (isValidId(id)) {
      updateUser(req, res, id)
    } else {
      res.writeHead(400, { 'Content-type': 'application/json' })
      res.end(JSON.stringify({ message: 'Route not found' }))
    }
  } else {
    res.writeHead(404, { 'Content-type': 'application/json' })
    res.end(JSON.stringify({ message: 'Route not found' }))
  }
})

server.listen(process.env.PORT)
