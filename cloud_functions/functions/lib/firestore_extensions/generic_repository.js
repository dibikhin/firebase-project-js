/**
 * @module FirestoreExtensions.GenericRepository
 * 
 * The Repository pattern = CRUD + `find()` + collection/document references
 */

'use strict'

const {
    is,
} = require('ramda')

const {
    updatedAtUtc,
    timestamps,
} = require('./helpers')

/*
 * References
 */

function docRef(db, colName, docId) {
    return colRef(db, colName).doc(docId)
}

function colRef(db, colName) {
    return db.collection(colName)
}

/*
 * CRUD
 */

async function getById(db, colName, docId) {
    return docRef(db, colName, docId).get()
}

async function create(db, colName, diff) {
    return colRef(db, colName)
        .add({
            ...diff,
            ...timestamps,
        })
}

async function setById(db, colName, docId, diff) {
    return docRef(db, colName, docId)
        .set({
            ...diff,
            ...timestamps,
        })
}

async function updateById(db, colName, docId, diff) {
    return docRef(db, colName, docId)
        .update({
            ...diff,
            updatedAtUtc,
        })
}

async function deleteById(db, colName, docId) {
    return docRef(db, colName, docId).delete()
}

/**
 * Executes the query. Needed for consistency with the Repository pattern
 * and not to forget to call `.get()` in the end
 */
// @ts-ignore
async function find(_, __, query) {
    return is(Function, query)
        ? query().get() // for queries from injected modules, e.g. from `users_queries.js`
        : query.get() // for in-place declared queries, see `a_function.js`
}

module.exports = Object.freeze({
    docRef,
    colRef,

    getById,
    create,
    setById,
    updateById,
    deleteById,

    find,
})
