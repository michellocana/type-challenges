import type { Alike, Expect } from '@type-challenges/utils'

type SetProperty<T extends object, Key extends string, Value> = {
  [K in keyof T | Key]: K extends Key ? Value : K extends keyof T ? T[K] : never
}

type ValidKey<T extends object, K extends string, V> = K extends keyof T ?
  V extends T[K] ? never : K :
  K

type Chainable<T extends object = {}> = {
  option<K extends string, V>(key: ValidKey<T, K, V>, value: V): Chainable<SetProperty<T, K, V>>
  get(): T
}

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

const result3 = a
  .option('name', 'another name')
  .option('name', 123)
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}

type Expected3 = {
  name: number
}
