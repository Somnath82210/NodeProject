const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(process.cwd(), './config/.env') })

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGO_DB_URL,
  JWTsecretkey: process.env.JWT_SECRET_KEY||"data",
  DEFAULT_DB: process.env.MONGO_DB||'test',
}