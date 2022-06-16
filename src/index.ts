import { createServer } from "http"
import "dotenv/config"
import { onGetMethod } from "./config/onGetMethod"
import { parseURL } from "./helpers/parseURL"
import { isValidId } from "./helpers/isValidId"

const server = createServer((req, res) => {
  res.setHeader("Content-type", "application/json")

  const url = parseURL(req.url as string)
  const id = isValidId(url.slice(11))

  switch (req.method) {
    case "GET":
      onGetMethod(url, res)
      break
    case "POST":
      break
    case "PUT":
      break
    case "DELETE":
      break
  }
})

server.listen(process.env.PORT)
