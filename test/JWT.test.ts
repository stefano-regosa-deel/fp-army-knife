import * as E from 'fp-ts/Either'
import { ERROR, Jwt } from '../src/jwt'
const TOKEN_MOCK =
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlN0ZWZhbm8gUmVnb3NhIiwiam9iIjoiU2VuaW9yIFNvZnR3YXJlIEVuZ2luZWVyIiwiaWF0IjoxNTE2MjM5MDIyfQ._1iZoHNztJKn1vc3zNTId5F3oS17XG6jVZx0wvwXs-BeTqD5-p2NRjRYPs_jN-d9FUIYAE4LG2KPJ8S35oq6XQ'

describe('decodeJWT', () => {
  it('should return null or undefined Error', () => {
    const jwt = (token: string) => Jwt({ _tag: 'DECODE', jwtstring: token })
    const decodedJwt = (token: string) => jwt(token)
    expect(decodedJwt('aaa')).toStrictEqual(E.left(new Error(ERROR.NO_SECOND_ELEMENT)))
  })

  it('should return a decoded JWT', () => {
    const jwt = (token: string) => Jwt({ _tag: 'DECODE', jwtstring: token })
    expect(jwt(TOKEN_MOCK)).toStrictEqual(E.right('A'))
  })

  it('should return a JSONparse SyntaxError', () => {
    const decodedJwt = Jwt({ _tag: 'DECODE', jwtstring: 'aaa.bbb.ccc' })
    expect(decodedJwt).toStrictEqual(E.left(new SyntaxError('Unexpected token m in JSON at position 0')))
  })

  // it('should return a decoded JWT', () => {
  //   const decodedJwt = pipe(
  //     decodeJWT(notValidBeePluginToken),
  //     E.mapLeft((e) => e.message)
  //   )
  //   expect(decodedJwt).toStrictEqual(E.left('Invalid DecodedJWT: Model does not match'))
  // })
})
