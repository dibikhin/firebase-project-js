/**
 * Entry point
 *
 * Bootstraps your cloud functions for different triggers (HTTPS, Auth, Firestore, etc.)
 * and exports them to be run by Firebase infrastructure (Cloud Functions for Firebase
 * on Google Cloud - https://firebase.google.com/docs/functions)
 */

'use strict'

const firebaseFunctions = require('firebase-functions')
const firebaseAdmin = require('firebase-admin')

// The `lib` folder is there to prevent the error:
// `"code":3,"message":"Function failed on loading user code. ...`

const bootstrapApp = require('./lib/app_infra/app_bootstrapper')

const {
    Firestore,
} = bootstrapApp({
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
