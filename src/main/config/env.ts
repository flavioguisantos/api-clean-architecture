require('dotenv').config()

export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/',
  postgresUrl: process.env.POSTGRES_URL || 'postgres://123456:123456@localhost:5432/teste',
  port: process.env.PORT || 8880
}
