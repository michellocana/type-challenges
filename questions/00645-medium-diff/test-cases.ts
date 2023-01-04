import type { Equal, Expect } from '@type-challenges/utils'

type Filter<O extends object, K> = K extends keyof O ? never : K

type MissingKeys<O extends object, O1 extends object> = {
  [K in keyof O as Filter<O1, K>]: O[K]
}

type Diff<O extends object, O1 extends object, Acc = MissingKeys<O, O1> & MissingKeys<O1, O>> = {
  [K in keyof Acc]: Acc[K]
}

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]
