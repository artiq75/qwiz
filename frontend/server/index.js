import Fastify from 'fastify'
import Websocket from '@fastify/websocket'
import { randomUUID } from 'node:crypto'

const connections = new Map()

const fastify = Fastify({
  logger: false
})

fastify.register(Websocket)

fastify.register(async () => {
  fastify.get('/ws', { websocket: true }, (connection, req) => {
    const query = req.query
    const playerId = query.playerId ?? randomUUID()
    console.log(connections)

    connections.set(playerId, connection)

    connection.socket.send(
      JSON.stringify({
        type: 'connexion',
        playerId
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
