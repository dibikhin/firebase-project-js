/**
 * @module Infra.CloudFunctions.Wrappers
 *
 * Log changes and handle errors on the top level.
 * One can see this as AOP.
 */

'use strict'

const util = require('util')

const { isAsyncOrThrow, } = require('../common/helpers')

const {
    toDoc,
} = require('../../firestore_extensions/helpers')

function onCreate(snap, context, { appCtx, logger, }, fn) {
    isAsyncOrThrow(fn)

    logger.info(
        'context:', context,
        'toDoc(snap):', toDoc(snap),
    )
    // terminate properly by https://firebase.google.com/docs/functions/terminate-functions
    return fn(logger, appCtx) // return Promise
        .catch((err) => {
            logger.error(util.inspect(err, { depth: 5, }))
            return null // explicit return
        })
}

function onUpdate(change, context, { appCtx, logger, }, fn) {
    isAsyncOrThrow(fn)

    logger.info(
        'context:', context,
        'toDoc(change.before):', toDoc(change.before),
        'toDoc(change.before):', toDoc(change.after),
    )
    // terminate properly by https://firebase.google.com/docs/functions/terminate-functions
    return fn(logger, appCtx) // return Promise
        .catch((err) => {
            logger.error(util.inspect(err, { depth: 5, }))
            return null // explicit return
        })
}

module.exports = Object.freeze({
    onCreate,
    onUpdate,
})
