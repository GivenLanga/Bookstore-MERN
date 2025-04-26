import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  mongoDBURL: process.env.MONGODB_URL,
};

export default config;
