import { IncomingMessage, ServerResponse } from "http"
import { users } from "../helpers/users"
import { parseURL } from "../helpers/parseURL"
import { isValidId } from "../helpers/isValidId"

export const onGetMethod = (url: string, res: ServerResponse) => {
  switch (url) {
    case "/api/users":
      res.write(JSON.stringify(users))
      res.end()
  }
}
