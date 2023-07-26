# Server

## Steps for reproducing the server creation


### Step 1

npm i express@4.17.1 graphql@15.4.0 express-graphql@0.12.0 cors@2.8.5
npm i nodemon@3.0.1 --save-dev


### Step 2

Create basic server configuration in server.js

```
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

app.listen(5000, () => console.log('server started on port 5000'))
```


### Step 3

Add to package.json a command to run our backend
```
    "scripts": {
        "dev": "nodemon server.js"
    }
```

And run it: `npm run dev`


### Step 4

Create a schema for GraphQL in './schema/index.js'

```
const { buildSchema } = require('graphql')


const schema = buildSchema(`
  type User {
    id: ID
    username: String
    age: Int
    posts: [Post]
  }
  type Post {
    id: ID
    title: String
    content: String
  }
  
  input UserInput {
    id: ID
    username: String!
    age: Int!
    posts: [PostInput]
  }
  input PostInput {
    id: ID
    title: String!
    content: String!
  }
  
  type Query {
    getAllUsers: [User]
    getUser(id: ID): User
  }
  
  type Mutation {
    createUser(input: UserInput): User
  }
`)


module.exports = schema
```


### Step 5

Create an endpoint. Add to server.js

```
const { graphqlHTTP } = require('express-graphql')

const schema = require('./schema')


app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
}))
```


### Step 6

Create mock data for imitation interaction with a database

File './mockData/index.js'

```
const users = [
  {
    id: '1',
    username: 'Johny',
    age: 21,
    posts: [{id: 1, title: 'Article about horses', content: 'Lorem ipsum dolor sit avet'}],
  },
  {
    id: '2',
    username: 'Leila',
    age: 23,
  },
]

module.exports = {
  users,
}
```


### Step 7

Import mock data to server.js and create resolver object which will be responsible for interaction with our fake database.
Include it in graphqlHTTP.

```

const { users } = require('./mockData')

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
```