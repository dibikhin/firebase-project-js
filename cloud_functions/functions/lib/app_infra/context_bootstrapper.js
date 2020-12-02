/**
 * @module Infra.App.ContextBootstrapper
 */

'use strict'

const genericRepository = require('../firestore_extensions/generic_repository')
const makeRepository = require('../firestore_extensions/generic_repository_factory')

const makeAppContext = require('./context_factory')

const usersQueries = require('../data/queries/users_queries')
const {
    Collections,
} = require('../domain/constants')

/**
 * Initializes app context to be injected in the cloud functions
 */
function initAppCtx({
    db,
}) {
    const UsersRepo = makeRepository({
        db,
        repository: genericRepository,
        queries: usersQueries, // NOTE: pass `null` if no queries yet
        colName: Collections.users,
    })
    const appCtx = makeAppContext({
        Repos: {
            UsersRepo,
        },
    })
    return appCtx
}

module.exports = initAppCtx
