import Fastify from 'fastify'
import Websocket from '@fastify/websocket'
import * as dotenv from 'dotenv'
import { resolve } from 'node:path'
import jwt from 'jsonwebtoken'

dotenv.config({
  path: resolve('.env')
})

const connections = new Map()

const fastify = Fastify({
  logger: false
})

fastify.register(Websocket)

fastify.register(async () => {
  fastify.get('/game', { websocket: true }, (connection, req) => {
    const query = req.query
    const token = query.token ?? ''

    if (!jwt.verify(token, process.env.JWT_PUBLIC, { algorithms: 'RS256' })) {
      connection.socket.send(
        JSON.stringify({
          type: 'error',
          message: "Vous n'ête pas autorisez à effectuer cette opération"
        })
      )
    }

    connections.set(token, connection)

    connection.socket.send(
      JSON.stringify({
        type: 'connexion',
        token
      })
    )

    connection.socket.on('message', (payload) => {
      const event = JSON.parse(payload.toString())
      connection.socket.send(JSON.stringify(event))
    })
  })
})

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
