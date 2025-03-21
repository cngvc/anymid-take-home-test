import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ICryptoDoc {
  name: string;
  symbol: string;
  price: number;
  market_cap: number;
}

const cryptoScheme = new Schema(
  {
    public_id: {
      type: String,
      unique: true,
      index: true,
      default: uuidv4
    },
    name: {
      type: String,
      required: true,
      index: true
    },
    symbol: {
      type: String,
      required: true,
      index: true
    },
    price: {
      type: Number,
      required: true
    },
    market_cap: {
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

cryptoScheme.pre('validate', function (next) {
  if (!this.public_id) {
    this.public_id = uuidv4();
  }
  next();
});

const CryptoModel = model<ICryptoDoc>('Crypto', cryptoScheme, 'Crypto');

export { CryptoModel };
