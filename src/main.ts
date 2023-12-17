"use strict";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as net from "net";
import { config } from "../config";
import { AppService } from "./app.service";

const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 10);
};

(async () => {
  const app = await NestFactory.create(AppModule);
  const appService = app.get(AppService); 

  const server = net.createServer((socket: net.Socket) => {
    const logId = generateUniqueId();
    const localLogs: string[] = [];

    console.log(
      `Client connected: ${socket.remoteAddress}:${socket.remotePort}, Log ID: ${logId}`
    );

    socket.on("data", async (data: any) => {
      const message = data.toString().trim();
      console.log(`Received message: ${message}`);
      localLogs.push(message);
    });

    socket.on("end", async () => {
      console.log(`Client disconnected. Log ID: ${logId}`);

      await appService.storeLogs(logId, localLogs);

      delete localLogs[logId as any];
    });
  });

  server.listen(config.netPort, () => {
    console.log(`Server listening on port ${config.netPort}`);
  });
})();
