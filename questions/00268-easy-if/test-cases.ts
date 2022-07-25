import type { Equal, Expect } from '@type-challenges/utils'

type If<Condition extends boolean, ValueIf, ValueElse> = Condition extends true
  ? ValueIf
  : ValueElse

type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>,
]

// @ts-expect-error
type error = If<null, 'a', 'b'>
