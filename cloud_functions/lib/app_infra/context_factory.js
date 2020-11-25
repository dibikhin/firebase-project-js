/**
 * @module Infra.App.ContextFactory
 */

'use strict'

function makeAppContext({
    dal,
}) {
    return Object.freeze({
        Dal: dal,
    })
}

module.exports = makeAppContext
