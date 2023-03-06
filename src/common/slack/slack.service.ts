import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SlackService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  sendTextMessage(message: string) {
    const logger = new Logger('SlackService');
    try {
      const url = this.configService.get('slack.webhookUrl');

      this.httpService.axiosRef.post(url, { text: message });
    } catch (error) {
      logger.log(error.stack);
    }

    // const res = await this.httpService.axiosRef.get(
    //   'https://jsonplaceholder.typicode.com/users',
    // );
    // console.log(
    //   '🚀 ~ file: slack.service.ts:26 ~ SlackService ~ sendTextMessage ~ res:',
    //   res.data,
    // );
  }
}
