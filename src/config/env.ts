import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT) || 4000,

  metaAppId: process.env.META_APP_ID || "",
  metaAppSecret: process.env.META_APP_SECRET || "",
  metaVerifyToken: process.env.META_VERIFY_TOKEN || "",
  metaGraphApiVersion:
    process.env.META_GRAPH_API_VERSION || "v20.0",

  metaAccessToken: process.env.META_ACCESS_TOKEN || "",
  metaPhoneNumberId:
    process.env.META_PHONE_NUMBER_ID || "",

  databaseUrl: process.env.DATABASE_URL || "",
  redisUrl: process.env.REDIS_URL || "",

  jwtSecret: process.env.JWT_SECRET || "",

  apiAuthToken: process.env.API_AUTH_TOKEN || "",
};