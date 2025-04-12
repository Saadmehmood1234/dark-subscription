// "use server";
// import { authOptions } from "../../auth";
// import { getServerSession } from "next-auth";
// import { revalidatePath } from "next/cache";
// import { DarkUser } from "@/model/User";
// import bcrypt from "bcryptjs";
// import { dbConnect } from "@/lib/dbConnect";
// import { v4 as uuidv4 } from "uuid";
// import { createTransport } from "nodemailer";
// import { z } from "zod";
// const emailSchema = z.string().email();
// const passwordSchema = z
//   .string()
//   .min(8, "Password must be at least 8 characters long");
// const nameSchema = z.string().min(1, "Name is required");
// const signupSchema = z.object({
//   name: nameSchema,
//   email: emailSchema,
//   password: passwordSchema,
// });
// export const signup = async (data: {
//   name: string;
//   email: string;
//   password: string;
// }) => {
//   try {
//     await dbConnect();

//     if (!data.name || !data.email || !data.password) {
//       return { success: false, message: "All fields are required" };
//     }

//     const { name, email, password } = data;
//     const verfyUserCredentials = signupSchema.safeParse(data);
//     if (!verfyUserCredentials.success) {
//       return {
//         success: false,
//         message: verfyUserCredentials.error.issues[0].message,
//       };
//     }
//     const existingUser = await DarkUser.findOne({ email });

//     if (existingUser) {
//       return {
//         success: false,
//         message: existingUser.emailVerified
//           ? "User already exists"
//           : "Verification email already sent. Please check your inbox.",
//       };
//     }

//     const profilePicture = `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(
//       name
//     )}`;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const verificationToken = uuidv4();

//     await DarkUser.create({
//       name,
//       email,
//       image: profilePicture,
//       password: hashedPassword,
//       profilePublicId: profilePicture,
//       emailVerified: false,
//       verificationToken,
//       verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
//     });

//     // Send verification email
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
//       message: error.message || "Server error, please try again",
//     };
//   }
// };

// async function sendVerificationEmail(email: string, token: string) {
//   const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;

//   const transporter = createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.SMTP_EMAIL,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });

//   await transporter.sendMail({
//     from: `"Your App Name" <${process.env.SMTP_EMAIL}>`,
//     to: email,
//     subject: "Verify your email address",
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <h1 style="color: #333;">Welcome to Our App!</h1>
//         <p style="font-size: 16px;">Please click the button below to verify your email address:</p>
//         <a href="${verificationUrl}"
//            style="display: inline-block; padding: 12px 24px; background-color: #4CAF50;
//                   color: white; text-decoration: none; border-radius: 4px; margin: 20px 0;">
//           Verify Email
//         </a>
//         <p style="font-size: 14px; color: #666;">
//           If you didn't request this, please ignore this email.
//         </p>
//       </div>
//     `,
//     text: `Please verify your email by visiting this URL: ${verificationUrl}`,
//   });
// }
"use server";
import { authOptions } from "../../auth";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { DarkUser } from "@/model/User";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import validator from "validator";
import { headers } from "next/headers";
import { signupRateLimiter } from "@/lib/rateLimiter";
import { sendVerificationEmail } from "@/utils/sendEmailVerification";
// Configure rate limiter
// const signupRateLimiter = new RateLimiter({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // Limit each IP to 5 signup requests per windowMs
// });

const emailSchema = z
  .string()
  .email("Invalid email format")
  .transform((email) => email.toLowerCase().trim())
  .refine((email) => validator.isEmail(email), {
    message: "Invalid email address",
  });

const passwordSchema = z
  .string()
  .min(12, "Password must be at least 12 characters long")
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Password must contain at least one number",
  })
  .refine((password) => /[^A-Za-z0-9]/.test(password), {
    message: "Password must contain at least one special character",
  });

const nameSchema = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name must be less than 100 characters")
  .refine((name) => validator.isAlpha(name.replace(/\s/g, "")), {
    message: "Name can only contain letters and spaces",
  });

const signupSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

export const signup = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    console.log("Received signup data:", data);
    const headersList = await headers();
    const ip = (headersList.get("x-forwarded-for") ?? "127.0.0.1").split(
      ","
    )[0];
    console.log("Client IP:", ip);
    // const isRateLimited = await signupRateLimiter.limit(ip);

    // if (isRateLimited) {
    //   return {
    //     success: false,
    //     message: "Too many signup attempts. Please try again later.",
    //   };
    // }

    await dbConnect();

    const validationResult = signupSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        message: validationResult.error.issues.map((i) => i.message).join(", "),
      };
    }

    const { name, email, password } = validationResult.data;

    const existingUser = await DarkUser.findOne({ email }).lean();
    if (existingUser) {
      return {
        success: false,
        message:
          "If this email is registered, you'll receive a verification email",
      };
    }
    if (
      password.toLowerCase().includes("password") ||
      password.toLowerCase().includes(name.toLowerCase())
    ) {
      return {
        success: false,
        message: "Password is too weak or contains personal information",
      };
    }
    const profilePicture = `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(
      validator.escape(name)
    )}`;

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = uuidv4();

    await DarkUser.create({
      name: validator.escape(name),
      email,
      image: profilePicture,
      password: hashedPassword,
      profilePublicId: profilePicture,
      emailVerified: false,
      verificationToken,
      verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      lastLoginAttempt: new Date(),
      failedLoginAttempts: 0,
      accountLocked: false,
    });

    await sendVerificationEmail(email, verificationToken);

    revalidatePath("/auth/signup");
    return {
      success: true,
      message:
        "Account created! Please check your email to verify your account.",
    };
  } catch (error: any) {
    console.error("Signup error:", error);
    return {
      success: false,
      message: "An error occurred during signup. Please try again later.",
    };
  }
};
