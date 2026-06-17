import 'dotenv/config'
import { config } from '@keystone-6/core'
import { lists } from './schema'
import { withAuth, session } from './auth'
import { rateLimit } from 'express-rate-limit'

const allowedOrigins = [
  'https://balibymade.com',
  'https://www.balibymade.com',
  'https://api.balibymade.com',
  ...(process.env.NODE_ENV !== 'production'
    ? ['http://localhost:3001', 'http://localhost:3000']
    : []),
]

export default withAuth(
  config({
    server: {
      port: parseInt(process.env.PORT ?? '3000', 10),
      cors: {
        origin: allowedOrigins,
        credentials: true,
      },
      extendExpressApp: (app) => {
        // Rate limiting en la API GraphQL: 120 req/min por IP
        app.use('/api/graphql', rateLimit({
          windowMs: 60 * 1000,
          max: 120,
          standardHeaders: true,
          legacyHeaders: false,
          message: { error: 'Too many requests, please try again later.' },
        }))
      },
    },
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL!,
    },
    storage: {
      balibymade_media: {
        kind: 's3',
        type: 'image',
        bucketName: process.env.SUPABASE_STORAGE_BUCKET!,
        region: process.env.SUPABASE_S3_REGION!,
        endpoint: process.env.SUPABASE_S3_ENDPOINT!,
        accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY!,
        forcePathStyle: true,
        // Transforma la URL interna de S3 a la URL pública de Supabase Storage
        generateUrl: (url: string) => {
          const filename = url.split('/').pop() ?? ''
          const publicBase = process.env.SUPABASE_STORAGE_PUBLIC_URL!
          const bucket = process.env.SUPABASE_STORAGE_BUCKET!
          return `${publicBase}/storage/v1/object/public/${bucket}/images/${filename}`
        },
      },
    },
    lists,
    session,
  })
)
