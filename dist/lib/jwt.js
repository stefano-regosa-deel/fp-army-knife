"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = exports.ERROR = void 0;
/**
 * @since 1.0.0
 */
var function_1 = require("fp-ts/function");
var jwt = __importStar(require("jsonwebtoken"));
var E = __importStar(require("fp-ts/Either"));
var A = __importStar(require("fp-ts/Array"));
var J = __importStar(require("fp-ts/Json"));
/**
 * @since 1.0.0
 */
exports.ERROR = {
    NO_SECOND_ELEMENT: 'NO_SECOND_ELEMENT',
    NULL_OR_UNDEFINED: 'NULL_OR_UNDEFINED'
};
var splitByDots = function (s) { return E.right(s.split('.')); };
var BufferFromb64Encoded = function (b64Encoded) { return Buffer.from(b64Encoded, 'base64').toString(); };
var fromBuffer = function (e) { return E.right(BufferFromb64Encoded(e)); };
var takeSecondElement = function (xs) {
    return E.fromOption(function () { return new Error(exports.ERROR.NO_SECOND_ELEMENT); })(A.lookup(1, xs));
};
var replaceDashWithPlus = function (c) { return c.replace(/-/g, '+'); };
var replaceUnderscoreWithSlash = function (c) { return c.replace(/_/g, '/'); };
/**
 * @since 1.0.0
 */
var decode = function (_a) {
    var value = _a.value;
    return function_1.pipe(value, E.fromNullable(new Error(exports.ERROR.NULL_OR_UNDEFINED)), E.chain(splitByDots), E.chain(takeSecondElement), E.map(function_1.flow(replaceDashWithPlus, replaceUnderscoreWithSlash)), E.chain(fromBuffer), E.chain(J.parse));
};
/**
 * @since 1.0.0
 */
var encode = function (_a) {
    var value = _a.value;
    return function_1.pipe(value, E.fromNullable(new Error(exports.ERROR.NULL_OR_UNDEFINED)), E.map(function (value) { return jwt.sign(value, 'S'); }));
};
/**
 * @since 1.0.0
 */
exports.Jwt = {
    decode: decode,
    encode: encode
};
