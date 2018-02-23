import { UserMutations } from './resources/user/user.schema'

const Mutation = `
    type Mutation {
        ${UserMutations}
    }
`

export {
    Mutation
}