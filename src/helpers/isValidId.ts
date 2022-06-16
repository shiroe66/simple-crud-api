import { validate, version } from "uuid"

export const isValidId = (id: string) => {
  return validate(id) && version(id) === 4 ? id : null
}
