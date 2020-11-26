/**
 * @module FirestoreExtensions.Helpers
 *
 * Useful shortcuts for Firestore
 */

'use strict'

const admin = require('firebase-admin')

const toDoc = (snap) => {
    const data = snap.data()
    const createdAtStrWrapper = data.createdAt ? { createdAtStr: data.createdAt.toDate(), } : {}
    const updatedAtStrWrapper = data.updatedAt ? { updatedAtStr: data.updatedAt.toDate(), } : {}
    return Object.freeze({
        ...data,
        id: snap.id,
        ...createdAtStrWrapper,
        ...updatedAtStrWrapper,
        // ref: snap.ref, // for shorter logs
        // path: snap.ref.path,
    })
}

const {
    Timestamp,
    FieldValue,
} = admin.firestore

const {
    arrayUnion,
    arrayRemove,
    increment,
} = FieldValue
const decrement = (x) => FieldValue.increment(-x)

// eslint-disable-next-line no-underscore-dangle
const _delete = FieldValue.delete

const createdAt = FieldValue.serverTimestamp()
const updatedAt = FieldValue.serverTimestamp()

module.exports = Object.freeze({
    Timestamp,

    toDoc,

    arrayUnion,
    arrayRemove,

    increment,
    decrement,

    delete: _delete,

    createdAt,
    updatedAt,
    timestamps: {
        createdAt,
        updatedAt,
    },
})
