"use strict";

import { Injectable } from "@nestjs/common";
import { RedisService } from "nestjs-redis";

//@ts-ignore
@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}

  async storeLogs(logId: string, logs: string[]): Promise<void> {
    const client = this.redisService.getClient();
    await client.set(logId, logs.join("\n"));
  }
}
