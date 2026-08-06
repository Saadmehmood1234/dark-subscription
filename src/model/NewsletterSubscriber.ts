import mongoose, {
  model,
  models,
  Schema,
  type Model,
} from "mongoose";

export interface INewsletterSubscriber {
  email: string;
  isActive: boolean;
  subscribedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const newsletterSubscriberSchema =
  new Schema<INewsletterSubscriber>(
    {
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
      subscribedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    },
  );

export const NewsletterSubscriber: Model<INewsletterSubscriber> =
  (models.NewsletterSubscriber as Model<INewsletterSubscriber>) ||
  model<INewsletterSubscriber>(
    "NewsletterSubscriber",
    newsletterSubscriberSchema,
  );