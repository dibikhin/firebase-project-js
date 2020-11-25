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

function toCloudFunction({ firebaseFunctions, source, }) {
    // like `firebaseFunctions.firestore.document('aTestCollection/{docId}').onUpdate(aTestCollection_onUpdate_DoSomething)`
    // Function -> CloudFunction
    return (fn) => firebaseFunctions[source].document(`${fn.colName}/{docId}`)[fn.trigger](fn)
}

module.exports = wireFunctionGroup
