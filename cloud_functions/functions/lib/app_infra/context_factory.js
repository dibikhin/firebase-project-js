/**
 * @module Infra.App.ContextFactory
 */

'use strict'

function makeAppContext({
    Repos,
}) {
    return Object.freeze({
        Repos,
    })
}

module.exports = makeAppContext
