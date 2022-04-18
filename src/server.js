import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'

import { schema } from "./modules/index.js"

import model from "./utils/model.js"

import express from 'express'

import http from 'http'

import path from "path"

import config from "./config.js"

import expressFileUpload from "express-fileupload"


async function startApolloServer() {

  const app = express()

  //express middlewares
  app.use(expressFileUpload())
  app.use(express.static(path.join(config.__dirname, "assets")))

  const httpServer = http.createServer(app)
  const server = new ApolloServer({

    // Middleware in Apollo Server
    context: ({ req, res }) => model,

    schema,

    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer}),
      ApolloServerPluginLandingPageGraphQLPlayground()
    ],
  })

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
  await new Promise(resolve => httpServer.listen({ port: config.PORT}, resolve))
  console.log(`🚀 Server ready at http://localhost:${config.PORT}${server.graphqlPath}`)
}


startApolloServer()

