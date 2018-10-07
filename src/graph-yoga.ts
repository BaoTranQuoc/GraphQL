import { GraphQLServer } from 'graphql-yoga'
import * as db from './db'

class GraphYoga {
    public server: GraphQLServer

    private readonly typeDefs = [
        `
        type Query {
            persons: [Person]
            person_name(name: String): Person
            person_gender(gender: String): [Person]
        }

        type Person {
            name: String!
            age: Int!
            gender: String!
        }
        `
    ]

    private readonly resolvers = {
        Query: {
            persons: () => {
                return db.default.persons
            },
            person_name: (_, {name}) => {
                return db.default.persons.find((e) => {return e.name == name})
            },
            person_gender: (_, {gender}) => {
                return db.default.persons.filter((e) => {return e.gender == gender})
            }
        }
    }

    constructor () {
        this.server = new GraphQLServer({
            typeDefs: this.typeDefs,
            resolvers: this.resolvers
        })
    }
}

export default new GraphYoga().server
