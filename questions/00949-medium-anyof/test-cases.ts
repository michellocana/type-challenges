import type { Equal, Expect } from '@type-challenges/utils'

type IsEmptyObject<T> = keyof T extends never ? true : false
type IsEmptyArray<T> = T extends unknown[] ?
  T['length'] extends 0 ? true : false
  : false
type IsFalsy<T> = T extends 0 | false | ''
  ? true
  : true extends IsEmptyArray<T> ?
  true
  : true extends IsEmptyObject<T> ?
  true
  : false

type AnyOf<T extends readonly any[]> = {
  [K in keyof T]: IsFalsy<T[K]>
} extends true[] ? false : true

type cases = [
  Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], {}]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]
