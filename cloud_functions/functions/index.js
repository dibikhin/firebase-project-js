/**
 * Entry point
 *
 * Bootstrap your cloud functions for different triggers (HTTP, Auth, Firestore, etc.)
 * and export them to be run by Firebase infrastructure (Cloud Functions for Firebase
 * on Google Cloud - https://firebase.google.com/docs/functions)
 */

'use strict'

const firebaseFunctions = require('firebase-functions')
const firebaseAdmin = require('firebase-admin')

const initApp = require('../lib/app_infra/app_bootstrapper')

const {
    Firestore,
} = initApp({
    firebaseFunctions,
    firebaseAdmin,
    logger: firebaseFunctions.logger,
    appCtxForTests: null,
})

// Exporting the function groups
module.exports = {
    Auth: {},
    Firestore,
    Https: {},
    PubSub: {},
    RemoteConfig: {},
    Storage: {},
}
