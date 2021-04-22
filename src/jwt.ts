import { pipe, flow } from 'fp-ts/function'
import * as jwt from 'jsonwebtoken'
import * as E from 'fp-ts/Either'
import * as A from 'fp-ts/Array'
import * as J from 'fp-ts/Json'

export const ERROR = {
  NO_SECOND_ELEMENT: 'NO_SECOND_ELEMENT',
  NULL_OR_UNDEFINED: 'NULL_OR_UNDEFINED'
} as const

export type CustomErrorsMessage = typeof ERROR[keyof typeof ERROR]
const splitByDots = (s: string): E.Either<Error, ReadonlyArray<string>> => E.right(s.split('.'))

const BufferFromb64Encoded = (b64Encoded: string): string => Buffer.from(b64Encoded, 'base64').toString()

const fromBuffer = (e: string): E.Either<Error, string> => E.right(BufferFromb64Encoded(e))

const takeSecondElement = <T>(xs: ReadonlyArray<T>): E.Either<Error, T> =>
  E.fromOption(() => new Error(ERROR.NO_SECOND_ELEMENT))(A.lookup(1, xs as Array<T>))

const replaceDashWithPlus = (c: string): string => c.replace(/-/g, '+')
const replaceUnderscoreWithSlash = (c: string): string => c.replace(/_/g, '/')

export interface Decode {
  value: string
}

export interface Encode<A = unknown> {
  value: {
    data: A
  }
}

const decode: <A>(v: Decode) => E.Either<CustomErrorsMessage | SyntaxError, Encode<A>['value']> = ({ value }) =>
  pipe(
    value,
    E.fromNullable(new Error(ERROR.NULL_OR_UNDEFINED)),
    E.chain(splitByDots),
    E.chain(takeSecondElement),
    E.map(flow(replaceDashWithPlus, replaceUnderscoreWithSlash)),
    E.chain(fromBuffer),
    E.chain(J.parse)
  ) as E.Either<CustomErrorsMessage | SyntaxError, Encode<any>['value']>

const encode: (value: Encode<unknown>) => E.Either<Error, string> = ({ value }) =>
  pipe(
    value,
    E.fromNullable(new Error(ERROR.NULL_OR_UNDEFINED)),
    E.map((value) => jwt.sign(value as { data: Buffer }, 'S'))
  )

export const Jwt = {
  decode,
  encode
}
