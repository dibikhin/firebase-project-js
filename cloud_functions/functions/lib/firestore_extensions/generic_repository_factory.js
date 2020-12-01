/**
 * @module FirestoreExtensions.GenericRepositoryFactory
 */

'use strict'

const {
    defaultTo,
} = require('ramda')

const {
    injectToModule,
} = require('../infra/common/di')

function makeRepository({
    db,
    repository,
    queries, // nullable
    colName,
}) {
    const injectedRepo = injectToModule({
        aModule: repository,
        dependencies: [db, colName],
    })
    // NOTE: `colRef` is needed for running queries like in `db.collection('...').where(...)`
    const colRef = injectedRepo.colRef()

    const injectedQueries = injectToModule({
        aModule: defaultTo({}, queries),
        dependencies: [colRef],
    })
    // NOTE: frequently used ones for querying
    const queryFns = bindQueryFunctions({ colRef, })

    return Object.freeze({
        ...injectedRepo,
        ...injectedQueries,
        ...queryFns,
    })
}

/**
 * @private
 */
function bindQueryFunctions({ colRef, }) {
    const where = colRef.where.bind(colRef)
    const orderBy = colRef.orderBy.bind(colRef)
    const limit = colRef.limit.bind(colRef)
    return { where, orderBy, limit, }
}

module.exports = makeRepository
