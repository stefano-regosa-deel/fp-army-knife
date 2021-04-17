import * as E from 'fp-ts/Either'
export declare const ERROR: {
  readonly NO_SECOND_ELEMENT: 'NO_SECOND_ELEMENT'
  readonly NULL_OR_UNDEFINED: 'NULL_OR_UNDEFINED'
}
declare type CustomErrorsMessage = typeof ERROR[keyof typeof ERROR]
export declare const Jwt: {
  decode: <A = unknown>(jwt: string) => E.Either<SyntaxError | CustomErrorsMessage, A>
}
export {}
