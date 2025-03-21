import { Schema, model } from 'mongoose';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

export interface IArticleDoc {
  title: string;
  source: string;
  url: string;
}

const articleScheme = new Schema(
  {
    public_id: {
      type: String,
      unique: true,
      index: true,
      default: uuidv4
    },
    title: {
      type: String,
      required: true,
      index: true
    },
    slug: {
      type: String,
      unique: true
    },
    source: {
      type: String,
      index: true,
      required: true
    },
    url: {
      type: String,
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

articleScheme.pre('validate', async function (next) {
  if (!this.public_id) {
    this.public_id = uuidv4();
  }
  let slug = slugify(this.title, { lower: true });
  let counter = 1;
  while (await ArticleModel.findOne({ slug: slug })) {
    slug = `${slug}-${counter}`;
    counter++;
  }
  this.slug = slug;
  next();
  next();
});

const ArticleModel = model<IArticleDoc>('LatestNews', articleScheme, 'LatestNews');

export { ArticleModel };
