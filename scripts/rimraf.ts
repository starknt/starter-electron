import { promisify } from 'util'
import rm from 'rimraf'

export const rimraf = promisify(rm)
