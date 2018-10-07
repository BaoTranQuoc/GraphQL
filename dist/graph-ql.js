"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const expressGraphql = require("express-graphql");
const graphql = require("graphql");
class Graphql {
    constructor() {
        this.schema = graphql.buildSchema(`
        type Query {
            message: String
        }
    `);
        this.root = {
            message: () => 'Hello'
        };
        this.express = express();
        this.express.use('/graphql', expressGraphql({
            schema: this.schema,
            rootValue: this.root,
            graphiql: true
        }));
    }
}
exports.default = new Graphql().express;
//# sourceMappingURL=graph-ql.js.map