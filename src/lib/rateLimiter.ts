import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const signupRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "15m"),
});

export class LocalRateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number }>;
  private windowMs: number;
  private maxAttempts: number;

  constructor(options: { windowMs: number; maxAttempts: number }) {
    this.attempts = new Map();
    this.windowMs = options.windowMs;
    this.maxAttempts = options.maxAttempts;
  }

  async limit(identifier: string): Promise<boolean> {
    const now = Date.now();
    const entry = this.attempts.get(identifier);

    if (!entry) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return false;
    }

    if (now - entry.lastAttempt > this.windowMs) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return false;
    }

    if (entry.count >= this.maxAttempts) {
      return true;
    }

    this.attempts.set(identifier, {
      count: entry.count + 1,
      lastAttempt: now,
    });
    return false;
  }

  async reset(identifier: string): Promise<void> {
    this.attempts.delete(identifier);
  }
}

export const localSignupRateLimiter = new LocalRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxAttempts: 5,
});


// model/RateLimit.ts
import mongoose from "mongoose";

const rateLimitSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  count: { type: Number, default: 1 },
  lastReset: { type: Date, default: Date.now },
});

export const RateLimit =
  mongoose.models?.RateLimit || mongoose.model("RateLimit", rateLimitSchema);