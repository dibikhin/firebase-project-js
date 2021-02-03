/**
 * @module Infra.Common.Errors
 */

'use strict'

function ThrowFunctionIsNotAsync({ fn, }) {
    throw new Error(`The function is not async. An async function awaited here. Function name=${fn.name}`)
}

module.exports = {
    ThrowFunctionIsNotAsync,
}
