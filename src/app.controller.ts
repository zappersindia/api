import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ValidTopics } from './constants';
import { RequiredQuery } from './helpers/requiredquery.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/images')
  async getImages(@RequiredQuery('topic') topic: string) {
    return this.appService.getImages(topic);
  }

  @Get('/image')
  async getImage(@RequiredQuery('id') id: string) {
    return this.appService.getImage(id);
  }

  @Post('/images')
  async newImage(
    @RequiredQuery('image_url') image_url: string,
    @RequiredQuery('download_url') download_url: string,
    @RequiredQuery('topic') topic: string,
    @RequiredQuery('name') name: string,
  ) {
    if (!ValidTopics.includes(topic)) {
      throw new BadRequestException('Invalid Topic');
    }
    return this.appService.newImage(image_url, download_url, topic, name);
  }

  @Delete('/images')
  deleteImage(@RequiredQuery('name') name: string) {
    return this.appService.deleteImage(name);
  }
}
