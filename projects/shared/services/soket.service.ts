import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import {environment} from './tokens/env/environment';

@Injectable({providedIn: 'root'})
export class SocketService {
  // private webSocket!: Socket;

  constructor() {
    // this.webSocket = new Socket({
    //   url: "https://exampleUrl.com",
    //   options: {
    //     reconnectionAttempts: 1,
    //     timeout: 2000
    //   },
    // });
    // this.initializeWebSocketConnection();
  }

  // private initializeWebSocketConnection(): void {
  //   try {
  //     this.webSocket.on('connect', () => {
  //       console.log('WebSocket connected');
  //     });
  //
  //     this.webSocket.on('connect_error', (error) => {
  //       console.error('WebSocket connection error:', error);
  //     });
  //
  //     this.webSocket.on('disconnect', (reason) => {
  //       console.log('WebSocket disconnected:', reason);
  //     });
  //
  //     // Add other event listeners as needed
  //   } catch (error) {
  //     console.error('Error initializing WebSocket connection:', error);
  //   }
  // }
}
