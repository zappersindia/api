import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
import { env } from 'process';
export interface Image {
  url: string;
  durl: string;
  topic: string;
  name: string;
  id: string;
}

interface ZappersInterface {
  images: Image[];
}

const ZappersSchema = new mongoose.Schema<ZappersInterface>({
  images: Array,
});

export const Zappers = mongoose.model<ZappersInterface>(
  'Zappers',
  ZappersSchema,
);

export async function ConnectToDatabase() {
  await mongoose.connect(env.MONGODB_URL as string).then(() => {
    console.log('Connected to DB');
  });
}
