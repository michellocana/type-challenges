import type { Equal, Expect } from '@type-challenges/utils'

type Combination<T extends string[], All = T[number], Curr = All> =
  Curr extends string
  ? Curr | `${Curr} ${Combination<[], Exclude<All, Curr>>}`
  : never

type cases = [
  Expect<Equal<Combination<['foo', 'bar', 'baz']>,
    'foo' | 'bar' | 'baz' | 'foo bar' | 'foo bar baz' | 'foo baz' | 'foo baz bar' | 'bar foo' | 'bar foo baz' | 'bar baz' | 'bar baz foo' | 'baz foo' | 'baz foo bar' | 'baz bar' | 'baz bar foo'>>,
]
