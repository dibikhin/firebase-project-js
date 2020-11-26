/**
 * @module Infra.CloudFunctions.WireFunctionGroup
 *
 * Wire cloud functions from a module to a trigger in a specific collection
 */

'use strict'

const {
    map,
} = require('ramda')

/**
 * @param {Object} params
 * @param {Object} params.aModule
 * @param {String} params.source
 * @param {Object} params.firebaseFunctions
 * @returns {Object} Wired function group
 */
function wireFunctionGroup({ aModule, source, firebaseFunctions, }) {
    return map(
        toCloudFunction({ firebaseFunctions, source, }),
        aModule,
    )
}

// eslint-disable-next-line
function toCloudFunction({ firebaseFunctions, source, }) {
    // like `firebaseFunctions.firestore
    //         .document('aTestCollection/{docId}')
    //         .onUpdate(aTestCollection_onUpdate_DoSomething)`
    // Function -> CloudFunction

    // eslint-disable-next-line
    return (fn) => firebaseFunctions['firestore'].document(`aTestCollection/{docId}`)['onUpdate'](fn)
}

module.exports = wireFunctionGroup
