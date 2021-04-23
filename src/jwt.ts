/**
 * @since 1.0.0
 * @description
 *  JWT Encode and Decode
 *
 */
import { pipe, flow } from 'fp-ts/function'
import * as jwt from 'jsonwebtoken'
import * as E from 'fp-ts/Either'
import * as A from 'fp-ts/Array'
import * as J from 'fp-ts/Json'
import * as O from 'fp-ts/Option'

/**
 * @since 1.0.0
 */
export interface Decode {
  readonly value: string
}

/**
 * @since 1.0.0
 */
export interface Encode<DATA = unknown> {
  readonly value: {
    readonly data: DATA
  }
}

/**
 * @since 1.0.0
 */
export const ERROR = {
  NO_SECOND_ELEMENT: 'NO_SECOND_ELEMENT',
  NULL_OR_UNDEFINED: 'NULL_OR_UNDEFINED'
} as const

/**
 * @since 1.0.0
 */
export type CustomErrorsMessage = typeof ERROR[keyof typeof ERROR]

const splitByDots = (s: string): E.Either<Error, ReadonlyArray<string>> => E.right(s.split('.'))

const BufferFromb64Encoded = (b64Encoded: string): string => Buffer.from(b64Encoded, 'base64').toString()

const fromBuffer = (e: string): E.Either<Error, string> => E.right(BufferFromb64Encoded(e))

const takeSecondElement = <T>(xs: ReadonlyArray<T>): E.Either<Error, T> =>
  E.fromOption(() => new Error(ERROR.NO_SECOND_ELEMENT))(A.lookup(1, xs as Array<T>))

const replaceDashWithPlus = (c: string): string => c.replace(/-/g, '+')
const replaceUnderscoreWithSlash = (c: string): string => c.replace(/_/g, '/')

/**
 * @description
 * Decode a JWT into a string
 * @since 1.0.0
 */
const decode: <JWT>(v: Decode) => E.Either<CustomErrorsMessage | SyntaxError, Encode<JWT>['value']> = ({ value }) =>
  pipe(
    value,
    E.fromNullable(new Error(ERROR.NULL_OR_UNDEFINED)),
    E.chain(splitByDots),
    E.chain(takeSecondElement),
    E.map(flow(replaceDashWithPlus, replaceUnderscoreWithSlash)),
    E.chain(fromBuffer),
    E.chain(J.parse)
  ) as E.Either<CustomErrorsMessage | SyntaxError, Encode<any>['value']>

const sign = <Payload>(
  payload: Encode<Payload>['value'],
  secretOrPrivateKey: jwt.Secret,
  maybeOptions: O.Option<jwt.SignOptions>
): string =>
  pipe(
    maybeOptions,
    O.map((options) => jwt.sign(payload, secretOrPrivateKey, options)),
    O.getOrElse(() => jwt.sign(payload, secretOrPrivateKey))
  )

/**
 * @description
 * Encode a string in a JWT
 * @since 1.0.0
 */
const encode: (
  value: Encode<unknown> & { readonly secretOrPrivateKey: jwt.Secret; readonly options: O.Option<jwt.SignOptions> }
) => E.Either<Error | jwt.JsonWebTokenError, string> = ({ value, secretOrPrivateKey, options }) =>
  pipe(
    value,
    E.fromNullable(new Error(ERROR.NULL_OR_UNDEFINED)),
    E.map((x) => sign(x, secretOrPrivateKey, options))
  )

/**
 * @since 1.0.0
 */
export const Jwt = {
  decode,
  encode
}
