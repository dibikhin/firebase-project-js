/**
 * Firestore function group, can be deployed separately
 */

'use strict'

const camelize = require('camelize')
const flatten = require('flat')
const aFunction = require('./a_test_collection/on_update/a_function')

aFunction.colName = 'a_test_collection'
aFunction.trigger = 'on_update'

// {...} -> { aTestCollection_onUpdate_aFunction: fn }
const Firestore = flatten(
    camelize({
        a_test_collection: {
            on_update: {
                a_function: aFunction,
            },
        },
    }),
    { delimiter: '_', },
)

module.exports = Object.freeze(Firestore)
