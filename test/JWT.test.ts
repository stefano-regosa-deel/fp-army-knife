import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import { ERROR, Jwt } from '../src/jwt'

describe('decode a JWT', () => {
  it('should handle null or undefined', () => {
    expect(Jwt({ action: 'DECODE', value: 'a' })).toStrictEqual(E.left(new Error(ERROR.NO_SECOND_ELEMENT)))
  })

  it('should return a JSONparse SyntaxError', () => {
    expect(Jwt({ action: 'DECODE', value: 'áaa.bbb.ccc' })).toStrictEqual(
      E.left(new SyntaxError('Unexpected token m in JSON at position 0'))
    )
  })
})

describe('encode a JWT', () => {
  it('should return an encoded JWT', () => {
    const exp = Date.now()
    const decodedMock = {
      job: 'Senior Software Engineer',
      name: 'Stefano Regosa',
      exp 
    }
    const encoded = Jwt<typeof decodedMock, string>({ action: 'ENCODE', value: decodedMock })

    const decoded = pipe(
      encoded,
      E.chain((encoded) => Jwt<string, typeof decodedMock>({ action: 'DECODE', value: encoded }))
    )
    expect(decoded).toStrictEqual(E.right(decodedMock))
  })

  //it('should handle nullable', () => {
  // const encoded = Jwt.encode(null)

  //  const decoded = pipe(
  //    encoded,
  //    E.chain((encoded) => Jwt.decode<{ data: any }>(encoded)),
  //    E.map(({ data }) => data)
  //  )
  //  expect(decoded).toStrictEqual(E.left(new Error(ERROR.NULL_OR_UNDEFINED)))
  //})
})
