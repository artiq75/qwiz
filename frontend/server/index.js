import Fastify from 'fastify'
import Websocket from '@fastify/websocket'
import * as dotenv from 'dotenv'
import { resolve } from 'node:path'
import jwt from 'jsonwebtoken'
import jwtDecode from 'jwt-decode'

dotenv.config({
  path: resolve('.env')
})

const connections = new Map()

const fastify = Fastify({
  logger: false
})

fastify.register(Websocket)

fastify.register(async () => {
  fastify.get('/ws', { websocket: true }, (connection, req) => {
    const query = req.query
    const token = query.token ?? ''

    if (
      !jwt.verify(token, process.env.JWT_PUBLIC, {
        algorithms: 'RS256'
      })
    ) {
      connection.socket.send(
        JSON.stringify({
          type: 'error',
          message: "Vous n'ête pas autorisez à effectuer cette opération"
        })
      )
    }

    connections.set(token, connection)

    const players = Array.from(connections.keys()).map((token) =>
      jwtDecode(token)
    )

    for (const [key, value] of connections) {
      value.socket.send(
        JSON.stringify({
          type: 'joint',
          data: players
        })
      )
    }

    connection.socket.on('close', () => {
      connections.delete(token)
      const players = Array.from(connections.keys()).map((token) =>
        jwtDecode(token)
      )
      for (const [key, value] of connections) {
        value.socket.send(
          JSON.stringify({
            type: 'leave',
            data: players
          })
        )
      }
    })
  })
})

fastify.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
