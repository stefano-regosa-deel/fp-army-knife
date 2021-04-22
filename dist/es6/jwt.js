/**
 * @since 1.0.0
 */
import { pipe, flow } from 'fp-ts/function';
import * as jwt from 'jsonwebtoken';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import * as J from 'fp-ts/Json';
/**
 * @since 1.0.0
 */
export var ERROR = {
    NO_SECOND_ELEMENT: 'NO_SECOND_ELEMENT',
    NULL_OR_UNDEFINED: 'NULL_OR_UNDEFINED'
};
var splitByDots = function (s) { return E.right(s.split('.')); };
var BufferFromb64Encoded = function (b64Encoded) { return Buffer.from(b64Encoded, 'base64').toString(); };
var fromBuffer = function (e) { return E.right(BufferFromb64Encoded(e)); };
var takeSecondElement = function (xs) {
    return E.fromOption(function () { return new Error(ERROR.NO_SECOND_ELEMENT); })(A.lookup(1, xs));
};
var replaceDashWithPlus = function (c) { return c.replace(/-/g, '+'); };
var replaceUnderscoreWithSlash = function (c) { return c.replace(/_/g, '/'); };
/**
 * @since 1.0.0
 */
var decode = function (_a) {
    var value = _a.value;
    return pipe(value, E.fromNullable(new Error(ERROR.NULL_OR_UNDEFINED)), E.chain(splitByDots), E.chain(takeSecondElement), E.map(flow(replaceDashWithPlus, replaceUnderscoreWithSlash)), E.chain(fromBuffer), E.chain(J.parse));
};
/**
 * @since 1.0.0
 */
var encode = function (_a) {
    var value = _a.value;
    return pipe(value, E.fromNullable(new Error(ERROR.NULL_OR_UNDEFINED)), E.map(function (value) { return jwt.sign(value, 'S'); }));
};
/**
 * @since 1.0.0
 */
export var Jwt = {
    decode: decode,
    encode: encode
};
