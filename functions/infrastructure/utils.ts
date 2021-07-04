import { randomBytes } from 'crypto'

export function generateRandomString(bytes: number) {
  return randomBytes(bytes).toString('hex')
}
