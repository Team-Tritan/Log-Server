"use strict";

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { RedisModule } from "nestjs-redis";

//@ts-ignore
@Module({
  imports: [
    RedisModule.register({
      url: "redis://redis:6379",
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
