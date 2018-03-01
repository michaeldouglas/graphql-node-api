import { PusherInterface } from './../../../interfaces/PusherInterface';
import { handleError } from './../../../library/Server/server';
import { GraphQLResolveInfo } from "graphql"
import { Transaction } from "sequelize";

import { DbConnection } from './../../../interfaces/DbConnectionInterface'

import { UserInstance } from './../../../models/UserModel'
 
let resolverDelete = (db: DbConnection, t: Transaction, id: any) => {
    return new Promise((resolve, reject) => {
        resolve(
            db.User
                .findById(id).then((user: UserInstance) => {
                    if(!user) throw new Error(`User with id ${id} not found`)
                    return user.destroy({transaction: t})
                })
        )
    }) 
}

export const userResolvers = {

    User: {
        posts: (user: UserInstance, { first = 10, offset = 0 }, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            return db.Post
                .findAll({
                    where: {author: user.get('id')},
                    limit: first,
                    offset: offset
                })
                .catch(handleError)
        }
    },

    Query: {

        users: (parent, { first = 10, offset = 0 }, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            
            return db.User
                .findAll({
                    limit: first,
                    offset: offset
                })
                .catch(handleError)
        },

        user: (parent, {id}, {db, pusher}: {db: DbConnection, pusher: PusherInterface}, info:GraphQLResolveInfo) => {
            console.log(pusher.trigger('my-channel', 'my-event', {"message": "teste"}))
            //pusher.tigger('my-channel', 'my-event', {})
            id = parseInt(id)
            return db.User
                .findById(id)
                .then((user: UserInstance) => {
                    if(!user) throw new Error(`User with id ${id} not found`)
                    return user
                })
                .catch(handleError)
        }
        
    },

    Mutation: {

        createUser: (parent, {input}, {db}: {db: DbConnection}, info:GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .create(input, {transaction: t})
            })
            .catch(handleError)
        },

        updateUser: (parent, {id, input}, {db}: {db: DbConnection}, info:GraphQLResolveInfo) => {
            id = parseInt(id)
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(id)
                    .then((user: UserInstance) => {
                        if(!user) throw new Error(`User with id ${id} not found`)
                        return user.update(input, {transaction: t})
                    })
            })
            .catch(handleError)
        },

        updateUserPassword: (parent, {id, input}, {db}: {db: DbConnection}, info:GraphQLResolveInfo) => {
            id = parseInt(id)
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(id)
                    .then((user: UserInstance) => {
                        if(!user) throw new Error(`User with id ${id} not found`)
                        return user.update(input, {transaction: t})
                            .then((user: UserInstance) => !!user)
                    })
            })
            .catch(handleError)
        },

        deleteUser: (parent, {id}, {db}: {db: DbConnection}, info:GraphQLResolveInfo) => {
            id = parseInt(id)
            return db.sequelize.transaction((t: Transaction) => {
                return resolverDelete(db, t, id).then((user) => !!user)
            }) 
            .catch(handleError)
        }

    }
}