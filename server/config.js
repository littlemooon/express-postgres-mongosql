export default {
  app: {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  postgres: {
    url: process.env.DATABASE_URL || 'postgres://localhost:5432/express-starter',
  },
}
