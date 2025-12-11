import { Redis } from "@upstash/redis";

// Initialize Redis client
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Cache helper functions
export const cache = {
  // Get cached value
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get<T>(key);
      return data;
    } catch (error) {
      console.error("Redis get error:", error);
      return null;
    }
  },

  // Set cached value with TTL (time to live in seconds)
  async set<T>(key: string, value: T, ttl: number = 300): Promise<void> {
    try {
      await redis.setex(key, ttl, value);
    } catch (error) {
      console.error("Redis set error:", error);
    }
  },

  // Delete cached value
  async del(key: string): Promise<void> {
    try {
      await redis.del(key);
    } catch (error) {
      console.error("Redis del error:", error);
    }
  },

  // Delete multiple keys matching a pattern
  async delPattern(pattern: string): Promise<void> {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (error) {
      console.error("Redis delPattern error:", error);
    }
  },
};

// Cache key generators
export const cacheKeys = {
  event: (id: string) => `event:${id}`,
  eventsByUser: (userId: string) => `events:user:${userId}`,
  eventsPublic: () => `events:public`,
  eventStats: (eventId: string) => `event:stats:${eventId}`,
  registeredUsers: (eventId: string) => `event:users:${eventId}`,
};

