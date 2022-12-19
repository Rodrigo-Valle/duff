import "dotenv/config";

export const env = {
  environment: process.env.NODE_ENV,
  port: process.env.APP_PORT,
  db: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    testname: process.env.DB_TEST_NAME
  },
  spotify: {
    user: process.env.SPOTIFY_USER,
    secret: process.env.SPOTIFY_SECRET
  }
};
