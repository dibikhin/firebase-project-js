/**
 * @module Infra.CloudFunctions.WireFunctionGroup
 */

'use strict'

const {
    mapObjIndexed,
} = require('ramda')

/**
 * Turns functions of a module to Cloud Functions by wiring them
 * to triggers for collections.
 *
 * @param {Object} params
 * @param {Object} params.aModule
 * @param {String} params.source
 * @param {Object} params.firebaseFunctions
 * @returns {Object} Wired function group
 */
function wireFunctionGroup({ aModule, source, firebaseFunctions, }) {
    return mapObjIndexed(
        toCloudFunction({ firebaseFunctions, source, }),
        aModule,
    )
}

function toCloudFunction({ firebaseFunctions, source, }) {
    // acts like `firebaseFunctions
    //              .firestore
    //              .document('aTestCollection/{docId}')
    //              .onUpdate(aTestCollection_onUpdate_aFunction)`

    // Function -> String -> CloudFunction
    return (fn, fnName) => {
        const [colName, triggerName] = fnName.split('_')
        return firebaseFunctions[source].document(`${colName}/{docId}`)[triggerName](fn)
    }
}

module.exports = wireFunctionGroup
