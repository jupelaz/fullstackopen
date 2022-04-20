require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/authors.js')
const Book = require('./models/books.js')
const User = require('./models/users.js')
const jwt = require('jsonwebtoken')

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
      authorization: String!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!, authorization: String!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.count(),
    authorCount: async () => await Author.count(),
    allBooks: async (_, args) => {
      console.log('args', args)
      const { name: genres, author } = args
      let query
      if (genres) query.genres = genres
      if (author) query.author = author
      console.log('All Books Query', query)
      return await Book.find(query).populate('author')
    },
    allAuthors: async () => {
      const books = await Book.find()
      return [].concat(
        (await Author.find()).map(a => {
          return {
            id: a._id,
            name: a.name,
            born: a.born,
            bookCount: books.filter(b => b.author === a._id).length
          }
        })
      )
    },
    me: async (_, args, context) => {
      console.log('test')
      console.log('context', context)
      return await context.currentUser
    }
  },
  Mutation: {
    addBook: async (_, args) => {
      const { author: name, authorization } = args
      if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token = authorization.substring(7)
        if (token) {
          const userFromToken = jwt.verify(token, process.env.JWT_SECRET)
          if (!(userFromToken && userFromToken.name)) return null
        }
      } else return null
      const findAuthor = await Author.find({ name })
      const { foundAuthor } = findAuthor
      const author = foundAuthor || new Author({ name })
      if (!foundAuthor) {
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      }
      const book = new Book({ ...args, author })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      console.log(book)
      return book
    },
    editAuthor: async (_, args) => {
      if (
        args.authorization &&
        args.authorization.toLowerCase().startsWith('bearer ')
      ) {
        const token = args.authorization.substring(7)
        if (token) {
          const userFromToken = jwt.verify(token, process.env.JWT_SECRET)
          if (!(userFromToken && userFromToken.name)) return null
        }
      } else return null
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      )
      if (!author) return null
      author.bookCount = Book.countDocuments({ author: author.id })
      return author
    },
    createUser: async (_, args) => {
      const { username, favoriteGenre } = args
      const newUser = new User({ username, favoriteGenre })
      newUser.save()
      return newUser
    },
    login: async (_, args) => {
      console.log('Login')
      const { username, password } = args
      if (username !== password) return null
      console.log('user = password')
      const userArray = await User.find({ username })
      console.log('user found ', userArray)
      if (!userArray.length) return null
      const [user] = userArray
      const value = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60
      })
      const token = { value }
      return token
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = auth.substring(7)
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const id = decodedToken.user._id
        const currentUser = await User.findById(id)
        return { currentUser }
      } catch (e) {
        return null
      }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
