/**
 * @module Domain.Constants
 */

'use strict'

module.exports = Object.freeze({
    Collections: {
        users: 'users',
        /** @deprecated */
        posts: 'posts',
    },
    Fields: {
        users: {
            age: 'age',
            /** @deprecated */
            friendsQty: 'friendsQty',
        },
    },
})
