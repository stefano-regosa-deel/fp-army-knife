import { pipe, flow } from 'fp-ts/function'
import * as M from 'pattern-matching-ts/match'
import * as E from 'fp-ts/Either'
import * as A from 'fp-ts/Array'
import * as J from 'fp-ts/Json'

export const ERROR = {
  NO_SECOND_ELEMENT: 'NO_SECOND_ELEMENT',
  NULL_OR_UNDEFINED: 'NULL_OR_UNDEFINED'
} as const

interface Encode {
  readonly _tag: 'ENCODE'
  readonly struct: string
}

interface Decode {
  readonly _tag: 'DECODE'
  readonly jwtstring: string
}

type JWTActions = Encode | Decode

const splitByDots = (s: string): E.Either<Error, ReadonlyArray<string>> => E.right(s.split('.'))

const BufferFromb64Encoded = (b64Encoded: string): string => Buffer.from(b64Encoded, 'base64').toString()

const fromBuffer = (e: string): E.Either<Error, string> => E.right(BufferFromb64Encoded(e))

const takeSecondElement = <T>(xs: ReadonlyArray<T>): E.Either<Error, T> =>
  E.fromOption(() => new Error(ERROR.NO_SECOND_ELEMENT))(A.lookup(1, xs as never))

const replaceWithPlusSign = (c: string): string => c.replace(/-/g, '+')
const replaceWithSlashSign = (c: string): string => c.replace(/_/g, '/')

export const decode: (jwt: string) => E.Either<unknown,unknown> = (jwt) =>
  pipe(
    jwt,
    E.fromNullable(new Error(ERROR.NULL_OR_UNDEFINED)),
    E.chain(splitByDots),
    E.chain(takeSecondElement),
    E.map(flow(replaceWithPlusSign, replaceWithSlashSign)),
    E.chain(fromBuffer),
    E.chain(J.parse)
  )

export const Jwt = (action: JWTActions) =>
  pipe(
    action,
    M.matchW('_tag')({
      DECODE: ({ jwtstring }) => decode(jwtstring),
      ENCODE: ({ struct }) => decode(struct)
    })
  )
