/**
 * @module Infra.Common.DependencyInjection
 *
 * A naive DI using FP
 */

'use strict'

const {
    map,
    partial,
    partialRight,
} = require('ramda')

/*
 * Functions
 */

/**
 * @param {Object} params
 * @param {Function} params.aFunction
 * @param {Array} params.deps
 * @returns {Function} Injected function
 */
function injectToFunction({ aFunction, deps, }) {
    return partial(aFunction, deps)
}

/**
 * @param {Object} params
 * @param {Function} params.aFunction
 * @param {Array} params.deps
 * @returns {Function} Injected function
 */
function injectToFunctionRight({ aFunction, deps, }) {
    return partialRight(aFunction, deps)
}

/*
 * Modules
 */

/**
 * @param {Object} params
 * @param {Object} params.aModule
 * @param {Array} params.deps
 * @returns {Object} Injected module
 */
function injectToModule({ aModule, deps, }) {
    return map(
        (fn) => partial(fn, deps),
        aModule,
    )
}

/**
 * @param {Object} params
 * @param {Object} params.aModule
 * @param {Array} params.deps
 * @returns {Object} Injected module
 */
function injectToModuleRight({ aModule, deps, }) {
    return map(
        (fn) => partialRight(fn, deps),
        aModule,
    )
}

module.exports = Object.freeze({
    injectToFunction,
    injectToFunctionRight,
    injectToModule,
    injectToModuleRight,
})
