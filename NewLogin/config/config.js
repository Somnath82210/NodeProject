const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(process.cwd(), './config/.env') })
//duttasom634
//LVs8lDNssVPcXgjm
module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGO_DB_URL||'mongodb+srv://duttasom634:LVs8lDNssVPcXgjm@cluster0.9o3qw8k.mongodb.net/',
  JWTsecretkey: process.env.JWT_SECRET_KEY||"data",
  DEFAULT_DB: process.env.MONGO_DB||'test',
}