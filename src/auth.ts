// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { dbConnect } from "@/lib/dbConnect";
import { DarkUser, IDarkUser } from "@/model/User";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { v4 as uuidv4 } from "uuid";
import { NextAuthOptions } from "next-auth";
import { sendVerificationEmail } from "./utils/sendEmailVerification";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        await dbConnect();

        const user = await DarkUser.findOne({
          email: credentials.email.toLowerCase(),
        }).select("+password");

        if (!user) {
          throw new Error("User not found");
        }

        if (user.provider === "google") {
          throw new Error("Please sign in with Google");
        }

        if (!user.password) {
          throw new Error("Password is not configured for this account");
        }

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isMatch) {
          throw new Error("Incorrect password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image || null,
          role: user.role,
          emailVerified: user.emailVerified,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();

      if (account?.provider === "google") {
        try {
          const email = profile?.email || user.email;

          if (!email) {
            console.error("Google sign-in failed: email is missing");
            return false;
          }

          let databaseUser = await DarkUser.findOne({
            email: email.toLowerCase(),
          });

          if (!databaseUser) {
            databaseUser = await DarkUser.create({
              name: profile?.name || user.name || "PrimeFlix User",
              email: email.toLowerCase(),

              // Use the same image field used by your schema.
              image:
                (profile as { picture?: string })?.picture || user.image || "",

              emailVerified: true,

              // Avoid using a real-looking password for OAuth users.
              // Prefer making password optional in your schema.
              password: undefined,

              provider: "google",
              providerAccountId: account.providerAccountId,
              role: "user",
            });
          } else {
            const updates: Record<string, unknown> = {};

            if (!databaseUser.providerAccountId) {
              updates.providerAccountId = account.providerAccountId;
            }

            if (!databaseUser.provider) {
              updates.provider = "google";
            }

            if (!databaseUser.emailVerified) {
              updates.emailVerified = true;
            }

            const googleImage =
              (profile as { picture?: string })?.picture || user.image;

            if (googleImage && !databaseUser.image) {
              updates.image = googleImage;
            }

            if (Object.keys(updates).length > 0) {
              await DarkUser.updateOne(
                { _id: databaseUser._id },
                { $set: updates },
              );
            }
          }

          /*
           * Important:
           * Replace Google's provider ID with your MongoDB ID
           * before the JWT callback receives this user.
           */
          user.id = databaseUser._id.toString();
          user.name = databaseUser.name;
          user.email = databaseUser.email;
          user.image = databaseUser.image || databaseUser.image || user.image;
          user.role = databaseUser.role || "user";
          user.emailVerified = Boolean(databaseUser.emailVerified);

          return true;
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }

      if (account?.provider === "credentials") {
        try {
          const databaseUser = await DarkUser.findOne({
            email: user.email?.toLowerCase(),
          });

          if (!databaseUser) {
            return false;
          }

          if (!databaseUser.emailVerified) {
            const tokenHasExpired =
              !databaseUser.verificationTokenExpires ||
              new Date(databaseUser.verificationTokenExpires) < new Date();

            if (!databaseUser.verificationToken || tokenHasExpired) {
              const verificationToken = uuidv4();

              await DarkUser.updateOne(
                { _id: databaseUser._id },
                {
                  $set: {
                    verificationToken,
                    verificationTokenExpires: new Date(
                      Date.now() + 24 * 60 * 60 * 1000,
                    ),
                  },
                },
              );

              if (user.email) {
                await sendVerificationEmail(user.email, verificationToken);
              }
            }

            throw new Error("email-not-verified");
          }

          user.id = databaseUser._id.toString();
          user.name = databaseUser.name;
          user.email = databaseUser.email;
          user.image = databaseUser.image || databaseUser.image || null;
          user.role = databaseUser.role || "user";
          user.emailVerified = Boolean(databaseUser.emailVerified);

          return true;
        } catch (error) {
          console.error("Credentials sign-in error:", error);
          throw error;
        }
      }

      return true;
    },

    async jwt({ token, user, trigger, session }) {
      /*
       * Runs immediately after a successful sign-in.
       * At this point signIn() has replaced user.id with MongoDB _id.
       */
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.role = user.role || "user";
        token.emailVerified = Boolean(user.emailVerified);
      }

      /*
       * Allow useSession().update() to refresh profile values.
       */
      if (trigger === "update" && session?.user) {
        token.name = session.user.name || token.name;
        token.image = session.user.image || token.image;
      }

      /*
       * Defensive database lookup:
       * - fixes previously created tokens containing a Google ID
       * - keeps name/image synchronized with the database
       */
      if (token.email) {
        await dbConnect();

        const databaseUser = await DarkUser.findOne({
          email: String(token.email).toLowerCase(),
        })
          .select("_id name email image role emailVerified")
          .lean<IDarkUser | null>();

        if (databaseUser) {
          token.id = databaseUser._id.toString();
          token.name = databaseUser.name;
          token.email = databaseUser.email;
          token.image = databaseUser.image || token.image;
          token.role = databaseUser.role;
          token.emailVerified = databaseUser.emailVerified;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id || "");
        session.user.email =
          typeof token.email === "string" ? token.email : null;
        session.user.name = typeof token.name === "string" ? token.name : null;
        session.user.image =
          typeof token.image === "string" ? token.image : null;
        session.user.role =
          typeof token.role === "string" ? token.role : "user";
        session.user.emailVerified = Boolean(token.emailVerified);
      }

      return session;
    },
  },
  // cookies: {
  //   sessionToken: {
  //     name:
  //       process.env.NODE_ENV === "production"
  //         ? "__Secure-auth.session-token"
  //         : "dev-auth.session-token",
  //     options: {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === "production",
  //       sameSite: "strict",
  //       path: "/",
  //       maxAge: 24 * 60 * 60,
  //     },
  //   },
  // },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-email",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
