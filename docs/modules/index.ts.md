---
title: index.ts
nav_order: 1
parent: Modules
---

## index overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Jwt](#jwt)

---

# utils

## Jwt

**Signature**

```ts
export declare const Jwt: {
  decode: <JWT>({
    value,
  }: Decode) => Either<'NO_SECOND_ELEMENT' | 'NULL_OR_UNDEFINED' | SyntaxError, { readonly data: JWT }>
  encode: (
    value: Encode<unknown> & { readonly secretOrPrivateKey: Secret; readonly options: Option<SignOptions> }
  ) => Either<Error | JsonWebTokenError, string>
}
```

Added in v1.0.0
