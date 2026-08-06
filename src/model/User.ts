import {
  Schema,
  model,
  models,
  type Model,
  type Types,
} from "mongoose";

export interface IDarkUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  image?: string;
  profilePublicId?: string;
  emailVerified: boolean;
  verificationToken?: string;
  verificationTokenExpires?: Date;
  role: "user" | "admin";
  provider: "credentials" | "google";
  providerAccountId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IDarkUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      select: false,
    },

    image: {
      type: String,
      default: "",
    },

    profilePublicId: {
      type: String,
      default: "",
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
    },

    verificationTokenExpires: {
      type: Date,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },

    providerAccountId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const DarkUser: Model<IDarkUser> =
  (models.DarkUser as Model<IDarkUser>) ||
  model<IDarkUser>("DarkUser", userSchema);