import type { Equal, Expect } from '@type-challenges/utils'

type Concat<T extends unknown[], U> = [...T, U]
type PushLast<T extends unknown[], U> = T extends [...infer Rest, infer Last]
  ? Last extends unknown[]
    ? [...Rest, Concat<Last, U>]
    : never
  : never
type First<T extends unknown[]> = T[0]
type Last<T extends unknown[]> = T extends [...any, infer Last] ? Last : never
type EverythingButFirst<T extends unknown[]> = T extends [any, ...infer Rest]
  ? Rest
  : never

// prettier-ignore
type Chunk<
  T extends unknown[],
  N extends number,
  Acc extends unknown[][] = [],
> = T['length'] extends 0 // is remaining empty ?
  // yes - just return the acc array
  ? Acc
  // no - keep the recursivity
  : Last<Acc> extends { length: N } // is the last item full ?
    // yes - create another chunk
    ? Chunk<EverythingButFirst<T>, N, Concat<Acc, [First<T>]>> // is length 2
    // no - add to the last item
    : Chunk<EverythingButFirst<T>, N, PushLast<Acc, First<T>>>

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]
