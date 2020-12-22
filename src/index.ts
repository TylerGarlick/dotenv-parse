import { existsSync, readFileSync } from 'fs'

const INI_KEY_VALUE = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/
const FILE_ENDING = /\r?\n/

const throwIfNotExists = async (path: string) => {
  if (!(await exists(path))) throw Error(`Path doesn't exist: ${path}`)
}

/**
 * Determines if the file exists
 * @param path
 */
const exists = async (path: string) => existsSync(path)

/**
 * Gets the lines for a given file
 *
 * @param path
 */
const getLines = async (path: string) => {
  const file = await readFileSync(path, { encoding: 'utf8' })
  return file
    .split(FILE_ENDING)
    .filter(Boolean)
    .filter((line) => line.match(INI_KEY_VALUE) !== null)
}

/**
 * Filters out the commented out lines
 *
 * @param path
 */
const getUncommentedLines = async (path: string) => (await getLines(path)).filter((line) => !line.startsWith(`#`))

const readEnvFile = async (path: string) => {
  await throwIfNotExists(path)
  const filteredLines = await getUncommentedLines(path)

  return new Map(
    filteredLines.map((line) => {
      const firstIndexOfEquals = line.indexOf('=')
      const key = (line.slice(0, firstIndexOfEquals) || ``).trim()
      const value = line.slice(firstIndexOfEquals + 1) || ``
      return [key, value]
    }),
  )
}

/**
 * Parses a env file
 *
 * @param path - the path of the env file
 *
 * @returns Promise<Map<string, unknown>>
 */
export const parse = async (path: string): Promise<Map<string, unknown>> => {
  return readEnvFile(path)
}

/**
 * Determines if the key exists in a particular file
 * @param path - the path to the env file
 * @param key - they key
 */
export const hasKey = async (path: string, key: string) => {
  const env = await readEnvFile(path)
  return env.has(key.toLocaleUpperCase())
}

/**
 * Get's a value or undefined
 * @param path - the path of the env file
 * @param key - the key
 *
 * @returns the value of the key
 */
export const getValue = async (path: string, key: string) => {
  const env = await readEnvFile(path)
  return env.get(key.toLocaleUpperCase())
}