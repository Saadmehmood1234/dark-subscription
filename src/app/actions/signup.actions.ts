// "use server";
// import { authOptions } from "../../auth";
// import { getServerSession } from "next-auth";
// import { revalidatePath } from "next/cache";
// import { DarkUser } from "@/model/User";
// import bcrypt from "bcryptjs";
// import { dbConnect } from "@/lib/dbConnect";
// import { v4 as uuidv4 } from "uuid";
// import { z } from "zod";
// import validator from "validator";
// import { headers } from "next/headers";
// import { signupRateLimiter } from "@/lib/rateLimiter";
// import { sendVerificationEmail } from "@/utils/sendEmailVerification";
// // Configure rate limiter
// // const signupRateLimiter = new RateLimiter({
// //   windowMs: 15 * 60 * 1000, // 15 minutes
// //   max: 5, // Limit each IP to 5 signup requests per windowMs
// // });

// const emailSchema = z
//   .string()
//   .email("Invalid email format")
//   .transform((email) => email.toLowerCase().trim())
//   .refine((email) => validator.isEmail(email), {
//     message: "Invalid email address",
//   });

// const passwordSchema = z
//   .string()
//   .min(8, "Password must be at least 8 characters long")
//   .refine((password) => /[A-Z]/.test(password), {
//     message: "Password must contain at least one uppercase letter",
//   })
//   .refine((password) => /[a-z]/.test(password), {
//     message: "Password must contain at least one lowercase letter",
//   })
//   .refine((password) => /[0-9]/.test(password), {
//     message: "Password must contain at least one number",
//   })
//   .refine((password) => /[^A-Za-z0-9]/.test(password), {
//     message: "Password must contain at least one special character",
//   });

// const nameSchema = z
//   .string()
//   .min(1, "Name is required")
//   .max(100, "Name must be less than 100 characters")
//   .refine((name) => validator.isAlpha(name.replace(/\s/g, "")), {
//     message: "Name can only contain letters and spaces",
//   });
// const phoneSchema = z
//   .string()
//   .regex(
//     /^[6-9]\d{9}$/,
//     "Phone must be a valid 10-digit number starting with 6-9"
//   );

// const signupSchema = z
//   .object({
//     name: nameSchema,
//     email: emailSchema,
//     phone: phoneSchema,
//     password: passwordSchema,
//   })
//   .strict();

// export const signup = async (data: {
//   name: string;
//   email: string;
//   phone: string;
//   password: string;
// }) => {
//   try {
//     const headersList = await headers();
//     const ip = (headersList.get("x-forwarded-for") ?? "127.0.0.1").split(
//       ","
//     )[0];
//     await dbConnect();

//     const validationResult = signupSchema.safeParse(data);
//     if (!validationResult.success) {
//       return {
//         success: false,
//         message: validationResult.error.issues.map((i) => i.message).join(", "),
//       };
//     }

//     const { name, email, password, phone } = validationResult.data;

//     const existingUser = await DarkUser.findOne({ email }).lean();
//     if (existingUser) {
//       return {
//         success: false,
//         message:
//           "If this email is registered, you'll receive a verification email",
//       };
//     }
//     if (password.toLowerCase().includes("password")) {
//       return {
//         success: false,
//         message: "Password is too weak or contains personal information",
//       };
//     }
//     const profilePicture = `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(
//       validator.escape(name)
//     )}`;

//     const hashedPassword = await bcrypt.hash(password, 12);
//     const verificationToken = uuidv4();

//     await DarkUser.create({
//       name: validator.escape(name),
//       email,
//       phone,
//       image: profilePicture,
//       password: hashedPassword,
//       profilePublicId: profilePicture,
//       emailVerified: false,
//       verificationToken,
//       verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
//       lastLoginAttempt: new Date(),
//       failedLoginAttempts: 0,
//       accountLocked: false,
//     });

//     await sendVerificationEmail(email, verificationToken);

//     revalidatePath("/auth/signup");
//     return {
//       success: true,
//       message:
//         "Account created! Please check your email to verify your account.",
//     };
//   } catch (error: any) {
//     console.error("Signup error:", error);
//     return {
//       success: false,
//       message: "An error occurred during signup. Please try again later.",
//     };
//   }
// };


"use server";

import { revalidatePath } from "next/cache";
import { DarkUser } from "@/model/User";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import validator from "validator";
import { headers } from "next/headers";
import { sendVerificationEmail } from "@/utils/sendEmailVerification";

const emailSchema = z
  .string()
  .email("Invalid email format")
  .transform((email) => email.toLowerCase().trim())
  .refine((email) => validator.isEmail(email), {
    message: "Invalid email address",
  });

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((password) => /\d/.test(password), {
    message: "Password must contain at least one number",
  })
  .refine((password) => /[^A-Za-z0-9]/.test(password), {
    message: "Password must contain at least one special character",
  })
  .refine((password) => !password.toLowerCase().includes("password"), {
    message: 'Password cannot contain the word "password"',
  });

const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must be less than 100 characters")
  .refine((name) => validator.isAlpha(name.replace(/\s/g, "")), {
    message: "Name can only contain letters and spaces",
  });

const phoneSchema = z
  .string()
  .trim()
  .regex(
    /^[6-9]\d{9}$/,
    "Phone must be a valid 10-digit number starting with 6-9"
  );

const signupSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    password: passwordSchema,
  })
  .strict();

type SignupResult =
  | {
      success: true;
      code: "ACCOUNT_CREATED" | "VERIFICATION_RESENT";
      message: string;
    }
  | {
      success: false;
      code:
        | "VALIDATION_ERROR"
        | "GOOGLE_ACCOUNT_EXISTS"
        | "ACCOUNT_ALREADY_EXISTS"
        | "PHONE_ALREADY_EXISTS"
        | "RATE_LIMITED"
        | "EMAIL_SEND_FAILED"
        | "SERVER_ERROR";
      message: string;
    };

export const signup = async (data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): Promise<SignupResult> => {
  try {
    const headersList = await headers();

    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "127.0.0.1";

    /*
      Apply your rate limiter here.

      Example shape only, depending on your rate limiter implementation:

      const rateLimitResult = await signupRateLimiter.limit(`signup:${ip}`);

      if (!rateLimitResult.success) {
        return {
          success: false,
          code: "RATE_LIMITED",
          message: "Too many signup attempts. Please try again later.",
        };
      }
    */

    const validationResult = signupSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        code: "VALIDATION_ERROR",
        message: validationResult.error.issues
          .map((issue) => issue.message)
          .join(", "),
      };
    }

    const { name, email, password, phone } = validationResult.data;

    await dbConnect();

    const existingUser = await DarkUser.findOne({ email }).select(
      "email provider emailVerified verificationToken verificationTokenExpires"
    );

    if (existingUser) {
      // Account was created through Google OAuth.
      if (existingUser.provider === "google") {
        return {
          success: false,
          code: "GOOGLE_ACCOUNT_EXISTS",
          message:
            "An account with this email already exists. Please sign in with Google.",
        };
      }

      // Credentials account is already verified.
      if (existingUser.emailVerified) {
        return {
          success: false,
          code: "ACCOUNT_ALREADY_EXISTS",
          message:
            "An account with this email already exists. Please sign in instead.",
        };
      }

      // Credentials account exists but has not been verified.
      const verificationToken = uuidv4();
      const verificationTokenExpires = new Date(
        Date.now() + 24 * 60 * 60 * 1000
      );

      await DarkUser.updateOne(
        { _id: existingUser._id },
        {
          $set: {
            verificationToken,
            verificationTokenExpires,
          },
        }
      );

      try {
        await sendVerificationEmail(email, verificationToken);
      } catch (emailError) {
        console.error("Verification email resend failed:", emailError);

        return {
          success: false,
          code: "EMAIL_SEND_FAILED",
          message:
            "Your account exists, but we could not send the verification email. Please try again.",
        };
      }

      return {
        success: true,
        code: "VERIFICATION_RESENT",
        message:
          "Your account already exists but is not verified. A new verification email has been sent.",
      };
    }

    const phoneOwner = await DarkUser.findOne({ phone }).select("_id").lean();

    if (phoneOwner) {
      return {
        success: false,
        code: "PHONE_ALREADY_EXISTS",
        message:
          "This phone number is already associated with another account.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = uuidv4();
    const verificationTokenExpires = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );

    const profilePicture = `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(
      name
    )}`;

    const createdUser = await DarkUser.create({
      name,
      email,
      phone,
      image: profilePicture,
      password: hashedPassword,
      profilePublicId: null,
      provider: "credentials",
      emailVerified: false,
      verificationToken,
      verificationTokenExpires,
      lastLoginAttempt: null,
      failedLoginAttempts: 0,
      accountLocked: false,
    });

    try {
      await sendVerificationEmail(email, verificationToken);
    } catch (emailError) {
      console.error("Initial verification email failed:", emailError);

      // Keep the account so the user can request another verification email.
      return {
        success: false,
        code: "EMAIL_SEND_FAILED",
        message:
          "Your account was created, but we could not send the verification email. Please request a new verification email.",
      };
    }

    revalidatePath("/auth/signup");

    return {
      success: true,
      code: "ACCOUNT_CREATED",
      message:
        "Account created successfully. Please check your email to verify it.",
    };
  } catch (error: unknown) {
    console.error("Signup error:", error);

    // Handles simultaneous requests that pass findOne before one gets inserted.
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      const duplicateError = error as {
        keyPattern?: Record<string, number>;
        keyValue?: Record<string, string>;
      };

      if (duplicateError.keyPattern?.email || duplicateError.keyValue?.email) {
        return {
          success: false,
          code: "ACCOUNT_ALREADY_EXISTS",
          message:
            "An account with this email already exists. Please sign in instead.",
        };
      }

      if (duplicateError.keyPattern?.phone || duplicateError.keyValue?.phone) {
        return {
          success: false,
          code: "PHONE_ALREADY_EXISTS",
          message:
            "This phone number is already associated with another account.",
        };
      }
    }

    return {
      success: false,
      code: "SERVER_ERROR",
      message: "An unexpected error occurred. Please try again later.",
    };
  }
};