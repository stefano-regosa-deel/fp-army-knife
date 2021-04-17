import * as E from 'fp-ts/Either'
import { ERROR, Jwt } from '../src/jwt'

describe('decodeJWT', () => {
  it('should return null or undefined Error', () => {
    const jwt = (token: string) => Jwt({ _tag: 'DECODE', jwtstring: token })
    const decodedJwt = (token: string) => jwt(token)
    expect(decodedJwt('aaa')).toStrictEqual(E.left(new Error(ERROR.NO_SECOND_ELEMENT)))
  })
})
