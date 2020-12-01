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
    mapObjIndexed,
} = require('ramda')

/*
 * Functions
 */

/**
 * @param {Object} params
 * @param {Function} params.aFunction
 * @param {Array} params.dependencies
 * @returns {Function} Injected function
 */
function injectToFunction({ aFunction, dependencies, }) {
    return partial(aFunction, dependencies)
}

/**
 * @param {Object} params
 * @param {Function} params.aFunction
 * @param {Array} params.dependencies
 * @returns {Function} Injected function
 */
function injectToFunctionRight({ aFunction, dependencies, }) {
    return partialRight(aFunction, dependencies)
}

/*
 * Modules
 */

/**
 * @param {Object} params
 * @param {Object} params.aModule
 * @param {Array} params.dependencies
 * @returns {Object} Injected module
 */
function injectToModule({ aModule, dependencies, }) {
    return map(
        (fn) => partial(fn, dependencies),
        aModule,
    )
}

/**
 * @param {Object} params
 * @param {Object} params.aModule
 * @param {Array} params.dependencies
 * @returns {Object} Injected module
 */
function injectToModuleRight({ aModule, dependencies, }) {
    return map(
        (fn) => partialRight(fn, dependencies),
        aModule,
    )
}

/**
 * Wrap functions in the module with the error handlers
 *
 * @param {Object} params
 * @param {Object} params.aModule
 * @param {Object} params.functionsWrappers error handlers by triggers
 * @returns {Object} Module with wrapped functions
 */
function wrapFunctions({ aModule, functionsWrappers, }) {
    return mapObjIndexed(
        (fn, fnName) => {
            const [, triggerName] = fnName.split('_')
            const wrapper = functionsWrappers[triggerName]
            return partialRight(wrapper, [fn])
        },
        aModule,
    )
}

module.exports = Object.freeze({
    injectToFunction,
    injectToFunctionRight,

    injectToModule,
    injectToModuleRight,

    wrapFunctions,
})
