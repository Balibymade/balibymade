import { createAuth } from '@keystone-6/auth'
import { statelessSessions } from '@keystone-6/core/session'

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name createdAt',
  secretField: 'password',

  // Solo activo en desarrollo para crear el primer usuario admin
  ...(process.env.NODE_ENV !== 'production' && {
    initFirstItem: {
      fields: ['name', 'email', 'password'],
    },
  }),
})

const sessionMaxAge = 60 * 60 * 24 * 30 // 30 días

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: process.env.SESSION_SECRET,
})

export { withAuth, session }
