import { commentMutations } from './resources/comment/comment.schema'
import { postMutations } from './resources/post/post.schema'
import { tokenMutations } from './resources/token/token.schema'
import { UserMutations } from './resources/user/user.schema'

const Mutation = `
    type Mutation {
        ${commentMutations}
        ${postMutations}
        ${tokenMutations}
        ${UserMutations}
    }
`

export {
    Mutation
}