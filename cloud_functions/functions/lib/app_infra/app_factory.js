/**
 * @module Infra.App.Bootstrapper
 */

'use strict'

const initOnce = require('../infra/common/init_once')
const bootstrapApp = require('./app_bootstrapper')

// Explicit global state
const FunctionsGroups = {
    Firestore: null,
}

/**
 * Initializes function groups for the app only once
 * (the Firestore function group only at the moment)
 */
function makeApp({
    firebaseFunctions,
    firebaseAdmin,
    logger,
    appCtxForTests, // `null` by default
}) {
    // A naive only-once initialization preventing accidental multiple app's initialization
    FunctionsGroups.Firestore = initOnce({
        target: FunctionsGroups.Firestore,
        initTarget: () => bootstrapApp({
            firebaseAdmin, firebaseFunctions, logger, appCtxForTests,
        }),
    })
    return FunctionsGroups
}

module.exports = makeApp
