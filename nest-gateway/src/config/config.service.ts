import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = {};

  constructor() {
    this.envConfig.port = process.env.PORT || 3000;

    this.envConfig.healthService = {
      name: process.env.API_NAME,
      transport: Transport.TCP,
      options: {
        host: process.env.API_HOST,
        port: process.env.API_PORT,
      },
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
