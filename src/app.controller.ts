import { Controller, Get, Param, Res, NotFoundException } from "@nestjs/common";
import { RedisService } from "nestjs-redis";
import { Response } from "express";

@Controller()
export class AppController {
  constructor(private readonly redisService: RedisService) {}

  @Get("/:logId")
  async getLogs(
    @Param("logId") logId: string,
    @Res() res: Response
  ): Promise<any> {
    const client = this.redisService.getClient();
    const log = await client.get(logId);

    if (!log) {
      throw new NotFoundException({
        code: 404,
        error: true,
        message: "Log not found",
      });
    }

    const parsedLogs = JSON.parse(log);
    const url = `https://logs.tritan.dev/${logId}`;

    return res.json({ logs: parsedLogs, url });
  }
}
