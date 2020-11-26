/**
 * @module Infra.App.ContextBootstrapper
 */

'use strict'

const genericRepository = require('../firestore_extensions/generic_repository')
const makeRepository = require('../firestore_extensions/generic_repository_factory')
const usersQueries = require('../dal/users_queries')
const makeAppContext = require('./context_factory')
const {
    Collections,
} = require('../domain/constants')

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
        dal: {
            UsersRepo,
        },
    })
    return appCtx
}

module.exports = initAppCtx
