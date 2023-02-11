import { Injectable, OnModuleInit, INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "database";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get("PRISMA_DATABASE_URL"),
        },
      },
    });
  }
}
