import Fastify from 'fastify'
import Websocket from '@fastify/websocket'

const fastify = Fastify({
  logger: false
})

fastify.register(Websocket)

fastify.register(async () => {
  fastify.get('/ws', { websocket: true }, (connection, req) => {
    connection.socket.on('message', (message) => {
      console.log(message.toString())
      // connection.socket.send(me )
    })
  })
})

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
