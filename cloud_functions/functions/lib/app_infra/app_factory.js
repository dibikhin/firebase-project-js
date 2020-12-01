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
const functionsWrappers = require('../infra/cloud_functions/functions_wrappers')
const initAppCtx = require('./context_bootstrapper')

const FirestoreRaw = require('../../firestore')

function makeApp({
    firebaseAdmin, firebaseFunctions, logger, appCtxForTests,
}) {
    // `bind` to prevent 'TypeError: Cannot read property 'INTERNAL' of undefined'
    firebaseAdmin.initializeApp.bind(firebaseAdmin)()
    const db = firebaseAdmin.firestore()

    // Initialize app context
    const appCtx = lazyInit({
        target: appCtxForTests,
        initTarget: () => initAppCtx({ db, }),
    })

    // Wrap functions with centralized error handlers
    const FirestoreWrapped = wrapFunctions({
        aModule: FirestoreRaw,
        functionsWrappers,
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
    return Firestore
}

module.exports = makeApp
