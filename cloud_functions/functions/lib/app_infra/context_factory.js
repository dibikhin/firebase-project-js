/**
 * @module Infra.App.ContextFactory
 */

'use strict'

/**
 * Composes app context for injection to a function, see params in `a_function.js`
 */
function makeAppContext({
    Repos,
}) {
    return Object.freeze({
        Repos,
    })
}

module.exports = makeAppContext
