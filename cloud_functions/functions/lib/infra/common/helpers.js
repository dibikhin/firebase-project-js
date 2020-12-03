/**
 * @module Infra.Common.Helpers
 */

'use strict'

const Errors = require('./errors')

const AsyncFunction = Object.getPrototypeOf(async () => { }).constructor

function isAsyncOrThrow(fn) {
    return fn instanceof AsyncFunction || Errors.ThrowFunctionIsNotAsync({ fn, })
}

module.exports = {
    isAsyncOrThrow,
}
