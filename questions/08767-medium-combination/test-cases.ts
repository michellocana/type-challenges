import type { Equal, Expect } from '@type-challenges/utils'

type DoubleCombination<T extends string[]> =
  T[number] extends infer A | infer B
  ? A extends string
  ? B extends string
  ? Equal<A, B> extends true
  ? never
  : `${A} ${B}`
  : never
  : never
  : never

type TripleCombination<T extends string[]> =
  T extends [infer A extends string, infer B extends string, infer C extends string]
  ? `${A} ${B} ${C}` |
  `${A} ${C} ${B}` |
  `${B} ${A} ${C}` |
  `${B} ${C} ${A}` |
  `${C} ${A} ${B}` |
  `${C} ${B} ${A}`
  : never

type Combination<T extends string[]> = [
  T[number],
  DoubleCombination<T>,
  TripleCombination<T>
][number]

type cases = [
  Expect<Equal<Combination<['foo', 'bar', 'baz']>,
    'foo' | 'bar' | 'baz' | 'foo bar' | 'foo bar baz' | 'foo baz' | 'foo baz bar' | 'bar foo' | 'bar foo baz' | 'bar baz' | 'bar baz foo' | 'baz foo' | 'baz foo bar' | 'baz bar' | 'baz bar foo'>>,
]
