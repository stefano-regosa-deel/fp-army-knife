---
title: jwt.ts
nav_order: 2
parent: Modules
---

## jwt overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [CustomErrorsMessage (type alias)](#customerrorsmessage-type-alias)
  - [Decode (interface)](#decode-interface)
  - [ERROR](#error)
  - [Encode (interface)](#encode-interface)
  - [Jwt](#jwt)

---

# utils

## CustomErrorsMessage (type alias)

**Signature**

```ts
export type CustomErrorsMessage = typeof ERROR[keyof typeof ERROR]
```

Added in v1.0.0

## Decode (interface)

**Signature**

```ts
export interface Decode {
  readonly value: string
}
```

Added in v1.0.0

## ERROR

**Signature**

```ts
export declare const ERROR: {
  readonly NO_SECOND_ELEMENT: 'NO_SECOND_ELEMENT'
  readonly NULL_OR_UNDEFINED: 'NULL_OR_UNDEFINED'
}
```

Added in v1.0.0

## Encode (interface)

**Signature**

```ts
export interface Encode<DATA = unknown> {
  readonly value: {
    readonly data: DATA
  }
}
```

Added in v1.0.0

## Jwt

**Signature**

```ts
export declare const Jwt: {
  decode: <JWT>({
    value,
  }: Decode) => E.Either<'NO_SECOND_ELEMENT' | 'NULL_OR_UNDEFINED' | SyntaxError, { readonly data: JWT }>
  encode: (
    value: Encode<unknown> & { readonly secretOrPrivateKey: jwt.Secret; readonly options: O.Option<jwt.SignOptions> }
  ) => E.Either<Error | jwt.JsonWebTokenError, string>
}
```

Added in v1.0.0
