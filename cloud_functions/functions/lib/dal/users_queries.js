/**
 * @module Infra.Dal.UsersQueries
 *
 * Queries to run with `await RepoImpl.find(RepoImpl.aQuery)`
 */

'use strict'

const {
    Fields,
} = require('../domain/constants')

function firstOne(colRef) {
    return colRef
        .limit(1)
}

function first99AdultsOrderedByAge(colRef) {
    return colRef
        .where(Fields.users.age, '>=', 21)
        .orderBy(Fields.users.age)
        .limit(99)
}

function allOrderedByAgeDesc(colRef) {
    return colRef
        .orderBy(Fields.users.age, 'desc')
}

module.exports = Object.freeze({
    allOrderedByAgeDesc,
    firstOne,
    first99AdultsOrderedByAge,
})
