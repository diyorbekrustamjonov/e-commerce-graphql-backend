export default {
    Query: {
        users: (_, {userId, token}, { read, verify }) =>{
            const users = read("users")

            try{
                const fUser = verify(token)

                if(!users.find(user => user.user_id === fUser.userId)){
                    throw new Error('User not found');
                }

                if(fUser.role !== "admin"){
                    return users.filter(user => fUser.userId ?  user.user_id == fUser.userId : true)
                }

                return users

            }catch(e){
                throw new Error(e)
            }
        }
    },

    User: {
        userId: (parent) => parent.user_id
    },

    Mutation: {
        createUser: (_, {username, password, contact, email}, { read, write, sing, sha256 }) => {
            const users = read("users")
            if(!username || !password || !contact || !email){
                throw new Error('Please fill all the fields')
            }
            if(users.find(user => user.username == username)){
                throw new Error('Username already exists')
            }
            if(/^[a-zA-Z0-9]+$/.test(username) == false){
                throw new Error('Username must be alphanumeric')
            }
            if(/^[a-zA-Z0-9]+$/.test(password) == false){
                throw new Error('Password must be alphanumeric')
            }
            if(/^998[389][012345789][0-9]{7}$/.test(contact) == false){
                throw new Error('Contact must be valid')
            }
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(email) == false){
                throw new Error('Email must be valid')
            }
            
            const user = {
                user_id: users.length ? users[users.length - 1].user_id + 1 : 1,
                username,
                password: sha256(password),
                email,
                contact,
                role: "user"
            }
            
            users.push(user)
            write("users", users)

            return {
                token: sing({
                    userId: user.userId,
                    role: user.role
                }),
                message: "User created successfully",
                status: "400"
            }
        },
        loginUser: (_, {username, password}, { read, write, sing, sha256 }) => {
            try{
                const users = read("users")
                if(!username){
                    return new Error('Please fill all the fields')
                }
                if(!password){
                    return new Error('Please fill all the fields')
                }
    
                if(!users.find(user => user.username == username)){
                    return new Error('Username does not exist')
                }
    
                if(!users.find(user => user.password == sha256(password))){
                    return new Error('Password is incorrect')
                }
    
                const user = users.find(user => user.username == username && user.password == sha256(password))
                
                return {
                    token: sing({
                        userId: user.userId,
                        role: user.role
                    }),
                    message: "User logged in successfully",
                    status: "200"
                }
            }catch(err){
                throw new Error(err)
            }

        }
    }
}