/**
 * @module FirestoreExtensions.Helpers
 * 
 * Useful shortcuts for Firestore
 */

'use strict'

const admin = require('firebase-admin')

const toDoc = (snap) => Object.freeze({
    ...snap.data(),
    id: snap.id,
    ref: snap.ref,
})

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

const createdAtUtc = FieldValue.serverTimestamp()
const updatedAtUtc = FieldValue.serverTimestamp()

module.exports = Object.freeze({
    Timestamp,

    toDoc,

    arrayUnion,
    arrayRemove,

    increment,
    decrement,

    delete: _delete,

    createdAtUtc,
    updatedAtUtc,
    timestamps: {
        createdAtUtc,
        updatedAtUtc,
    },
})
