import * as express from 'express'
import * as expressGraphql from 'express-graphql'
import * as graphql from 'graphql'

class Graphql {
    public express

    schema = graphql.buildSchema(`
        type Query {
            message: String
        }
    `)

    root = {
        message: () => 'Hello'
    }

    constructor () {
        this.express = express()
        this.express.use('/graphql', expressGraphql({
            schema: this.schema,
            rootValue: this.root,
            graphiql: true
        }))
    }
}

export default new Graphql().express