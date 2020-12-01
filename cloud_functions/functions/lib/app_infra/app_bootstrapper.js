/**
 * @module Infra.App.Bootstrapper
 */

'use strict'

const lazyInit = require('../infra/common/lazyInit')
const makeApp = require('./app_factory')

// Explicit global state
const FunctionsGroups = {
    Firestore: null,
}

function initApp({
    firebaseFunctions,
    firebaseAdmin,
    logger,
    appCtxForTests, // `null` by default
}) {
    // Naive lazy initialization preventing accidental multiple app's initialization
    FunctionsGroups.Firestore = lazyInit({
        target: FunctionsGroups.Firestore,
        initTarget: () => makeApp({
            firebaseAdmin, firebaseFunctions, logger, appCtxForTests,
        }),
    })
    return FunctionsGroups
}

module.exports = initApp
