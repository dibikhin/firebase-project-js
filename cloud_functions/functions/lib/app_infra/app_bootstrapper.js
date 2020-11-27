/**
 * @module Infra.App.Bootstrapper
 */

'use strict'

const lazyInit = require('../infra/common/lazyInit')
const {
    injectToModuleRight,
    wrapFunctions,
} = require('../infra/common/di')
const wireFunctionGroup = require('../infra/cloud_functions/wire_function_group')
const wrappers = require('../infra/cloud_functions/wrappers')
const initAppCtx = require('./context_bootstrapper')

const FirestoreRaw = require('../../firestore')

// Explicit global state
const globalState = {
    app: null,
    db: null,
}

function initApp({
    firebaseFunctions,
    firebaseAdmin,
    logger,
    appCtxForTests, // `null` by default
}) {
    // Naive lazy initialization preventing accidental multiple app's initialization
    globalState.app = lazyInit({
        // `bind` to prevent 'TypeError: Cannot read property 'INTERNAL' of undefined'
        target: globalState.app, initTarget: firebaseAdmin.initializeApp.bind(firebaseAdmin),
    })
    globalState.db = lazyInit({
        target: globalState.db, initTarget: firebaseAdmin.firestore,
    })

    // Initialize app context
    const appCtx = lazyInit({
        target: appCtxForTests,
        initTarget: () => initAppCtx(globalState),
    })

    // Wrap functions with centralized error handlers
    const FirestoreWrapped = wrapFunctions({
        aModule: FirestoreRaw,
        wrappers,
    })

    // Inject app context to functions for Firestore triggers
    const FirestoreInjected = injectToModuleRight({
        aModule: FirestoreWrapped,
        dependencies: [{ logger, appCtx, }],
    })

    // Final set up of the function group
    const Firestore = wireFunctionGroup({
        firebaseFunctions, aModule: FirestoreInjected, source: 'firestore',
    })
    return {
        Firestore,
    }
}

module.exports = initApp
