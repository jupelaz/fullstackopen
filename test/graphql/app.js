const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v4: uuid } = require('uuid')
let persons = [
  {
    name: 'Arto Hellas',
    phone: '040-123543',
    street: 'Tapiolankatu 5 A',
    city: 'Espoo',
    id: '3d594650-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Matti Luukkainen',
    phone: '040-432342',
    street: 'Malminkaari 10 A',
    city: 'Helsinki',
    id: '3d599470-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Venla Ruuska',
    street: 'Nalleäentie 22 C',
    city: 'Helsinki',
    id: '3d599471-3436-11e9-bc57-8b80ba54c431',
  },
]

const typeDefs = gql`
  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  enum YesNo {
    YES
    NO
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(name: String!, phone: String!): Person
  }
`

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (_, args) =>
      args.phone
        ? persons.filter(person =>
            args.phone === 'YES' ? !!person.phone : !person.phone
          )
        : persons,
    findPerson: (_, args) => persons.find(p => p.name === args.name),
  },
  Mutation: {
    addPerson: (_, args) => {
      if (persons.find(p => p.name === args.name)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name,
        })
      }
      const person = { ...args, id: uuid() }
      persons = [...persons, person]
      return person
    },
    editNumber: (_, args) => {
      const person = persons.find(p => p.name === args.name)
      if (!person) return null
      const { name, phone } = args
      const updatedPerson = { ...person, phone }
      persons = persons.map(p => (p.name === name ? updatedPerson : p))
      return updatedPerson
    },
  },
  Person: {
    address: root => {
      return {
        street: root.street,
        city: root.city,
      }
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
