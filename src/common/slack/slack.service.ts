import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SlackService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async sendTextMessage(message: string) {
    const url = this.configService.get('slack.webhookUrl');
    this.httpService.axiosRef.post(url, { text: message });
  }
}
