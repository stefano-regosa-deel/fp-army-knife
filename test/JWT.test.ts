import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import { CustomErrorsMessage, ERROR, Jwt } from '../src/jwt'

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

    const encoded: E.Either<CustomErrorsMessage | SyntaxError, string> = Jwt<typeof decodedMock, string>({
      action: 'ENCODE',
      value: { data: decodedMock }
    })
    const decoded = pipe(
      encoded,
      E.chain((encoded) => Jwt<string, { data: typeof decodedMock }>({ action: 'DECODE', value: encoded })),
      E.map(({ data }) => data)
    )

    expect(decoded).toStrictEqual(E.right(decodedMock))
  })
})
