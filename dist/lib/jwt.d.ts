import * as E from 'fp-ts/Either'
/**
 * @since 1.0.0
 */
export interface Decode {
  value: string
}
/**
 * @since 1.0.0
 */
export interface Encode<A = unknown> {
  value: {
    data: A
  }
}
/**
 * @since 1.0.0
 */
export declare const ERROR: {
  readonly NO_SECOND_ELEMENT: 'NO_SECOND_ELEMENT'
  readonly NULL_OR_UNDEFINED: 'NULL_OR_UNDEFINED'
}
/**
 * @since 1.0.0
 */
export declare type CustomErrorsMessage = typeof ERROR[keyof typeof ERROR]
/**
 * @since 1.0.0
 */
export declare const Jwt: {
  decode: <A>(
    v: Decode
  ) => E.Either<
    SyntaxError | CustomErrorsMessage,
    {
      data: A
    }
  >
  encode: (value: Encode<unknown>) => E.Either<Error, string>
}
