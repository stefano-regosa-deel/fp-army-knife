---
title: jwt.ts
nav_order: 1
parent: Modules
---

## jwt overview

Added in vv1.0.0

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

Added in vv1.0.0

## Decode (interface)

**Signature**

```ts
export interface Decode {
  value: string
}
```

Added in vv1.0.0

## ERROR

**Signature**

```ts
export declare const ERROR: {
  readonly NO_SECOND_ELEMENT: 'NO_SECOND_ELEMENT'
  readonly NULL_OR_UNDEFINED: 'NULL_OR_UNDEFINED'
}
```

Added in vv1.0.0

## Encode (interface)

**Signature**

```ts
export interface Encode<A = unknown> {
  value: {
    data: A
  }
}
```

Added in vv1.0.0

## Jwt

**Signature**

```ts
export declare const Jwt: {
  decode: <A>(v: Decode) => E.Either<'NO_SECOND_ELEMENT' | 'NULL_OR_UNDEFINED' | SyntaxError, { data: A }>
  encode: (value: Encode<unknown>) => E.Either<Error, string>
}
```

Added in vv1.0.0
