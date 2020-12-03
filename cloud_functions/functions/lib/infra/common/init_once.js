/**
 * @module Infra.Common.InitOnce
 *
 * A naive only once initialization
 */

'use strict'

/**
 * @param {Object} params
 * @param {Function} params.initTarget
 * @param {Object} params.target
 * @returns {Object}
 */
function initOnce({ initTarget, target, }) {
    return target || initTarget()
}

module.exports = initOnce
