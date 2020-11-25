/**
 * @module CloudFunctions.Firestore.ATestCollection
 */

'use strict'

const util = require('util')

const {
    toDoc,
    increment,
} = require('../../../../lib/firestore_extensions/helpers')

const {
    Fields,
} = require('../../../../lib/domain/constants')

function aFunction(change, context, { appCtx, logger, }) {

    // TODO check args
    // TODO check async

    logger.info(
        'context:', context,
        'change.before:', toDoc(change.before),
        'change.after:', toDoc(change.after),
    )
    // terminate properly by https://firebase.google.com/docs/functions/terminate-functions
    return runTests(logger, appCtx) // return Promise
        .catch((err) => {
            logger.error(util.inspect(err, { depth: 5, }))
            return null // explicit return
        })
}

// `async` is for explicit returning of Promise
async function runTests(
    logger,
    {
        Dal: {
            UsersRepo: Users,
        },
    },
) {
    // WARN: don't bind the function to `/users` collection to prevent recursion
    // caused by changes in this collection below

    const userId = 'abcd1234'

    const aNewUser = { age: 27, }
    await Users.setById(userId, aNewUser)

    const userSnap = await Users.getById(userId)
    logger.info(
        'user:', toDoc(userSnap),
    )
    // An in-place query
    const first99AdultsOrderedByAge = Users
        .where(Fields.users.age, '>=', 21)
        .orderBy(Fields.users.age)
        .limit(99)
    const usersQuerySnapshot = await Users.find(first99AdultsOrderedByAge)
    logger.info(
        'users found:', usersQuerySnapshot.size,
    )
    // `Users.first99AdultsOrderedByAge` is from `users_queries.js`
    const usersQuerySnapshot2 = await Users.find(Users.first99AdultsOrderedByAge)
    logger.info(
        'users found:', usersQuerySnapshot2.size,
    )
    const incrementAgeBy5 = { age: increment(5), }
    await Users.updateById(userId, incrementAgeBy5)

    const userSnapUpdated = await Users.getById(userId)
    logger.info(
        'updated user:', toDoc(userSnapUpdated),
    )
    await Users.deleteById(userId)
    const userSnapDeleted = await Users.getById(userId)
    logger.info(
        'deleted user exists:', userSnapDeleted.exists,
    )
    // NOTE: awaited results are ignored because fire-and-forget works for Firestore
    // in general. Firestore client handles a lot by itself by using `grpc`

    return null
}

module.exports = aFunction
