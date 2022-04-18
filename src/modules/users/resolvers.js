export default {
    Query: {
        users: (_, {userId}, { read }) =>{
            return read("users").filter(user => userId ?  user.user_id == userId : true)
        }
    },

    User: {
        userId: (parent) => parent.user_id
    },
}