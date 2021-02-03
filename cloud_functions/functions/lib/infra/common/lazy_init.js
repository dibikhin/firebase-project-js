/**
 * @module Infra.Common.LazyInit
 *
 * A naive lazy initialization
 */

'use strict'

/**
 * Inits only if the target is falsy. Does it lazy
 *
 * @param {Object} params
 * @param {Function} params.initTarget
 * @param {Object} params.target
 * @returns {Object}
 */
function lazyInit({ initTarget, target, }) {
    return target || initTarget()
}

module.exports = lazyInit
