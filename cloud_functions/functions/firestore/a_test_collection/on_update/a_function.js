/**
 * @module CloudFunctions.Firestore.ATestCollection
 */

'use strict'

const {
    toDoc,
    increment,
} = require('../../../lib/firestore_extensions/helpers')

const {
    Fields,
} = require('../../../lib/domain/constants')

/**
 * Runs tests
 *
 * Function name to deploy - Firestore.aTestCollection_onUpdate_aFunction
 *
 * @param {Object} logger
 * @param {Object} appCtx
 * @returns {Promise}
 */
async function aFunction( // `async` is for explicitly returning Promise
    logger,
    {
        Repos: {
            Users,
        },
    },
) {
    // WARN: don't bind the `aFunction` function to the `/users` collection to prevent recursion
    // caused by changes in the collection below

    await testUsersRepository({ Users, logger, })

    return null
}

/**
 * Runs the Users' Repository tests = CRUD + find()
 */
async function testUsersRepository({ Users, logger, }) {
    const userId = 'abcd1234'
    const aNewUser = { age: 27, }

    await Users.setById(userId, aNewUser)
    const userSnap = await Users.getById(userId)
    logger.info(
        'user:', toDoc(userSnap)
    )

    // An in-place query
    const first99AdultsOrderedByAge = Users
        .where(Fields.users.age, '>=', 21)
        .orderBy(Fields.users.age)
        .limit(99)
    const usersQuerySnapshot = await Users.find(first99AdultsOrderedByAge)
    logger.info(
        'first99AdultsOrderedByAge - users found:', usersQuerySnapshot.size
    )
    // The query `Users.first99AdultsOrderedByAge` is from `users_queries.js`
    const usersQuerySnapshot2 = await Users.find(Users.first99AdultsOrderedByAge)
    // `usersQuerySnapshot.size` should be the same as `usersQuerySnapshot2.size`
    logger.info(
        'Users.first99AdultsOrderedByAge - users found:', usersQuerySnapshot2.size
    )

    const incrementAgeBy5 = { age: increment(5), }
    await Users.updateById(userId, incrementAgeBy5)

    const userSnapUpdated = await Users.getById(userId)
    logger.info(
        'updated user:', toDoc(userSnapUpdated)
    )

    await Users.deleteById(userId)
    const userSnapDeleted = await Users.getById(userId)
    logger.info(
        'deleted user exists:', userSnapDeleted.exists
    )
    // NOTE: awaited results are ignored because fire-and-forget works for Firestore
    // in general. Firestore client handles a lot by itself by using `grpc`

    return null
}

module.exports = aFunction
