import type { Equal, Expect } from '@type-challenges/utils'

type MaybeElement<T extends string[]> = T['length'] extends 0 ? '' : `__${T[number]}`
type MaybeModifier<T extends string[]> = T['length'] extends 0 ? '' : `--${T[number]}`
type BEM<B extends string, E extends string[], M extends string[]> = `${B}${MaybeElement<E>}${MaybeModifier<M>}`

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success'>>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large'>>,
]
