import { pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { ERROR, Jwt } from '../src/jwt'

describe('decode a JWT', () => {
  it('should handle null or undefined', () => {
    const enc = Jwt.decode({ value: 'aaa' })

    expect(enc).toStrictEqual(E.left(new Error(ERROR.NO_SECOND_ELEMENT)))
  })

  it('should return a JSONparse SyntaxError', () => {
    expect(Jwt.decode({ value: 'áaa.bbb.ccc' })).toStrictEqual(
      E.left(new SyntaxError('Unexpected token m in JSON at position 0'))
    )
  })
})

describe('encode a JWT', () => {
  it('should return an encoded JWT with selected algoritm', () => {
    const exp = Date.now()

    const decodedMock = {
      job: 'Senior Software Engineer',
      name: 'Stefano Regosa',
      exp
    }

    const encoded = Jwt.encode({
      value: { data: decodedMock },
      secretOrPrivateKey: 'secret',
      options: O.some({algorithm:'HS256'})
    })

    const decoded = pipe(
      encoded,
      E.chain((x) => Jwt.decode<{ data: typeof decodedMock }>({ value: x })),
      E.map(({data}) => data)
    )

    expect(decoded).toStrictEqual(E.right(decodedMock))
  })
  it('should return an encoded JWT with selected algoritm', () => {
    const exp = Date.now()

    const decodedMock = {
      job: 'Senior Software Engineer',
      name: 'Stefano Regosa',
      exp
    }

    const encoded = Jwt.encode({
      value: { data: decodedMock },
      secretOrPrivateKey: 'secret',
      options: O.none
    })

    const decoded = pipe(
      encoded,
      E.chain((x) => Jwt.decode<{ data: typeof decodedMock }>({ value: x })),
      E.map((x) => x.data)
    )

    expect(decoded).toStrictEqual(E.right(decodedMock))
  })
})
