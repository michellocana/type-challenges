import type { Equal, Expect } from '@type-challenges/utils'

type Fibonacci<N extends number, F1 extends unknown[] = [], F2 extends unknown[] = [unknown], Acc extends unknown[] = [unknown]> =
  N extends 1
    ? 1
    : Acc['length'] extends N
      ? F2['length']
      : Fibonacci<N, F2, [...F1, ...F2], [...Acc, unknown]>

type cases = [
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]
