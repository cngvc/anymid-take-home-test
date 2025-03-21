import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IWeatherDoc {
  condition: string;
  city: string;
  temperature: number;
}

const weatherScheme = new Schema(
  {
    public_id: {
      type: String,
      unique: true,
      index: true,
      default: uuidv4
    },
    condition: {
      type: String,
      required: true,
      index: true
    },
    city: {
      type: String,
      index: true,
      required: true
    },
    temperature: {
      type: Number,
      required: true
    }
  },
  {
    versionKey: false,
    toJSON: {
      transform(_doc, rec) {
        delete rec._id;
        return rec;
      }
    }
  }
);

weatherScheme.pre('validate', function (next) {
  if (!this.public_id) {
    this.public_id = uuidv4();
  }
  next();
});

const WeatherModel = model<IWeatherDoc>('Weather', weatherScheme, 'Weather');

export { WeatherModel };
