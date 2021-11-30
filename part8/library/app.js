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
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })
// let authors = [
//   {
//     name: 'Robert Martin',
//     id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
//     born: 1963,
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
//     born: 1821,
//   },
//   {
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
//   },
//   {
//     name: 'Sandi Metz', // birthyear not known
//     id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
//   },
// ]

/*
 * Suomi:
 * Saattaisi olla j�rkev�mp�� assosioida kirja ja sen tekij� tallettamalla kirjan yhteyteen tekij�n nimen sijaan tekij�n id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekij�n nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
 */

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring'],
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
//     genres: ['agile', 'patterns', 'design'],
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring'],
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring', 'patterns'],
//   },
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring', 'design'],
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
//     genres: ['classic', 'crime'],
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
//     genres: ['classic', 'revolution'],
//   },
// ]

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
      const { name: genres, author } = args
      let query
      if (genres) query.genres = genres
      if (author) query.author = author

      return await Book.find(query).populate('author')
    },
    me: async (_, args) => await User.find({ id: args.id }),
  },
  //   allAuthors: () =>
  //     authors.map(a => ({
  //       ...a,
  //       bookCount: books.filter(b => b.author === a.name).length,
  //     })),
  // },
  // Author: {
  //   bookCount: root => books.filter(b => b.author === root.name).length,
  // },
  Mutation: {
    addBook: async (_, args) => {
      console.log(args)
      const { author: name, authorization } = args
      if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token = authorization.substring(7)
        if(token){
          const userFromToken = jwt.verify(token,process.env.JWT_SECRET)
          if (!(userFromToken && userFromToken.name)) return null
          
        }
      } else return null
      const [foundAuthor, ...rest] = await Author.find({ name })
      console.log('foundAuthor', foundAuthor)
      const author = foundAuthor || new Author({ name })
      if (!foundAuthor) {
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      console.log('author :', author)
      const book = new Book({ ...args, author })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      console.log(book)
      return book
      // if (!authors.some(a => a.name === book.author)) {
      //   const author = { name: book.author, born: null, id: uuid() }
      //   authors = [...authors, author]
      // }
      // books = [...books, book]
      // return book
    },
    editAuthor: async (_, args) => {
      console.log('args', args)
      if (args.authorization && args.authorization.toLowerCase().startsWith('bearer ')) {
        const token = args.authorization.substring(7)
        if(token){
          const userFromToken = jwt.verify(token,process.env.JWT_SECRET)
          console.log(userFromToken)
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
      const { username: name, favoriteGenre } = args
      const newUser = new User({ name, favoriteGenre })
      newUser.save()
      return newUser
    },
    login: async (_, args) => {
      console.log("entra")
      const { username: name, password } = args
      console.log(name)
      console.log(password)
      await User.find({ name, password })
      const user = {name,password} 
      console.log(user)
      const value = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: 60 * 60,
      })
      const token = {value}
      return token
      
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
