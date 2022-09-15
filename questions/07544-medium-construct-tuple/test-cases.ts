import type { Equal, Expect } from '@type-challenges/utils'

type ConstructTuple<Length extends number, Acc extends unknown[] = []> =
  Acc['length'] extends Length ? Acc : ConstructTuple<Length, [...Acc, unknown]>

type cases = [
  Expect<Equal<ConstructTuple<0>, []>>,
  Expect<Equal<ConstructTuple<2>, [unknown, unknown]>>,
  Expect<Equal<ConstructTuple<999>['length'], 999>>,
  // @ts-expect-error
  Expect<Equal<ConstructTuple<1000>['length'], 1000>>,
]
