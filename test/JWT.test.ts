import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import { ERROR, Jwt } from '../src/jwt'
// const TOKEN_MOCK =
//   'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlN0ZWZhbm8gUmVnb3NhIiwiam9iIjoiU2VuaW9yIFNvZnR3YXJlIEVuZ2luZWVyIiwiaWF0IjoxNTE2MjM5MDIyfQ._1iZoHNztJKn1vc3zNTId5F3oS17XG6jVZx0wvwXs-BeTqD5-p2NRjRYPs_jN-d9FUIYAE4LG2KPJ8S35oq6XQ'

describe('decode a JWT', () => {
  it('should handle null or undefined', () => {
    expect(Jwt.decode('aaa')).toStrictEqual(E.left(new Error(ERROR.NO_SECOND_ELEMENT)))
  })

  it('should return a JSONparse SyntaxError', () => {
    expect(Jwt.decode('áaa.bbb.ccc')).toStrictEqual(E.left(new SyntaxError('Unexpected token m in JSON at position 0')))
  })
})
describe('encode a JWT', () => {
  it('should return an encoded JWT', () => {
    const decodedMock = {
      job: 'Senior Software Engineer',
      name: 'Stefano Regosa',
      exp: Date.now()
    }
    const encoded = Jwt.encode({ data: decodedMock })

    const decoded = pipe(
      encoded,
      E.chain((encoded) => Jwt.decode<{ data: typeof decodedMock }>(encoded)),
      E.map(({ data }) => data)
    )
    expect(decoded).toStrictEqual(E.right(decodedMock))
  })
})
