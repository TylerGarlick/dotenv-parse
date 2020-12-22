import { getValue, hasKey, parse } from '../src'
import { resolve } from 'path'

describe(`parser`, () => {
  it(`should parse a known file`, async () => {
    const path = resolve(__dirname, 'fixtures/complex.env')
    const results = await parse(path)

    expect(results.get(`SINGLE_QUOTES_SPACED`)).toBe(`'    single quotes    '`)
    expect(results.get(`DOUBLE_QUOTES`)).toBe(`"double_quotes"`)
    expect(results.get(`EQUAL_SIGNS`)).toBe(`equals==`)
    expect(results.get(`TRIM_SPACE_FROM_UNQUOTED`)).toBe(`    some spaced out string`)
    expect(results.get(`USERNAME`)).toBe(`therealnerdybeast@example.tld`)
    expect(results.get(`SPACED_KEY`)).toBe(` parsed`)
  })

  it(`won't work if the file doesn't exist`, async () => {
    const path = resolve(__dirname, 'complex.env.bogus')
    try {
      await parse(path)
    } catch (err) {
      expect(err.message).toContain('Path')
    }
  })
})

describe(`hasKey`, () => {
  let values: Map<string, unknown>
  let path: string
  beforeEach(async () => {
    path = resolve(__dirname, 'fixtures/complex.env')
    values = await parse(path)
    expect(values).toBeDefined()
  })

  it(`should find a known key`, async () => expect(await hasKey(path, 'SINGLE_QUOTES')).toBeTruthy())

  it(`should not find an unknown key`, async () => expect(await hasKey(path, 'SINGLE_QUOTES111')).toBeFalsy())
})

describe(`getValue`, () => {
  let values: Map<string, unknown>
  let path: string
  beforeEach(async () => {
    path = resolve(__dirname, 'fixtures/complex.env')
    values = await parse(path)
    expect(values).toBeDefined()
  })

  it(`should find a known key`, async () => expect(await getValue(path, 'SINGLE_QUOTES')).toBe(`'single_quotes'`))

  it(`should not find an unknown key`, async () => expect(await getValue(path, 'SINGLE_QUOTES111')).toBeUndefined())
})