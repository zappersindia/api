// Come down... L17
import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidTopics } from './constants';
import { Zappers } from './models';
import * as uuid from 'uuid';

@Injectable()
export class AppService {
  async getImages(topic: string) {
    if (!ValidTopics.includes(topic)) {
      throw new BadRequestException('Invalid Topic');
    }
    const images = (await Zappers.findById('61d056e8f2e37d1d68a49c17')).toJSON()
      .images;
    return images.filter((image) => image.topic == topic);
  }
  // This...
  async newImage(imgurl: string, durl: string, topic: string, name: string) {
    await Zappers.findByIdAndUpdate('61d056e8f2e37d1d68a49c17', {
      $push: {
        images: {
          url: imgurl,
          durl: durl,
          topic: topic,
          name: name,
          id: uuid.v4(),
        },
      },
    });
    return true;
  }

  async getImage(id: string) {
    const images = (await Zappers.findById('61d056e8f2e37d1d68a49c17')).toJSON()
      .images;
    return images.filter((image) => image.id == id);
  }

  async deleteImage(name: string) {
    await Zappers.findByIdAndUpdate('61d056e8f2e37d1d68a49c17', {
      $pull: {
        images: {
          name: name,
        },
      },
    });
    return true;
  }
}
