import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { promisify } from 'util'
import WebSocket, { Server } from 'ws'

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection {
  @WebSocketServer()
  private readonly server!: Server

  handleConnection(client: WebSocket) {
    client.on('message', (data) => {
      this.server.clients.forEach((client) => client.send(data))
    })
  }
}
