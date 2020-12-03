/**
 * @module Infra.Common.Errors
 */

'use strict'

function ThrowFunctionIsNotAsync({ fn, }) {
    throw new Error(`Function is not async. Async function awaited here. Function name=${fn.name}`)
}

module.exports = {
    ThrowFunctionIsNotAsync,
}
