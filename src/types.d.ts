export function parse(path: string): Promise<Map<string, unknown>>

export function hasKey(path: string, key: string): Promise<Boolean>

export function getValue(path: string, key: string): Promise<unknown>