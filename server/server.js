const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const { users } = require('./mockData')

const schema = require('./schema')
const app = express()
app.use(cors())

const root = {
  getAllUsers: () => users,
  getUser: ({ id }) => users.find(user => user.id === id),
  createUser: ({ input }) => {
    const userId = Date.now()
    const newUser = {...input, id: userId}
    users.push(newUser)
    return newUser
  },
}

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  rootValue: root,
}))

app.listen(5000, () => console.log('server started on port 5000'))
