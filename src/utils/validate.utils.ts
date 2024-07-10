import { BadRequestError } from './response.util'
import { ErrorMessage } from '../common'

export const ValidateID = (id: string | number): number => {
  if (!id) throw new BadRequestError(ErrorMessage.INVALID_ID)
  if (typeof id === 'string' && /^\d+$/.test(id)) id = parseInt(id, 10)
  if (typeof id !== 'number' || id <= 0) throw new BadRequestError(ErrorMessage.INVALID_ID)
  return id
}
