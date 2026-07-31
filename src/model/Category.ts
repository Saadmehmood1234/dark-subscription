import { Schema, model, models, type InferSchemaType } from "mongoose";

export const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    logoImage: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export type CategoryDocument = InferSchemaType<typeof categorySchema>;

export const CategoryModel =
  models.Category || model("Category", categorySchema);