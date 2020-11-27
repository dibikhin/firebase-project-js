/**
 * @module Infra.App.ContextFactory
 */

'use strict'

function makeAppContext({
    DAL,
}) {
    return Object.freeze({
        DAL,
    })
}

module.exports = makeAppContext
