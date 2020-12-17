/**
 * @module Domain.Constants
 */

'use strict'

module.exports = Object.freeze({
    Collections: {
        users: 'users',
        posts: 'posts',
    },
    Fields: {
        users: {
            age: 'age',
            state: 'state',
        },
    },
    Values: {
        UsersStates: {
            active: 'active',
            disabled: 'disabled',
            waiting: 'waiting',
            /** @deprecated */ // for highlighting in VS Code
            new: 'new',
        },
    },
})
