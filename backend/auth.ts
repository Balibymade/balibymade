import { createAuth } from '@keystone-6/auth'
import { statelessSessions } from '@keystone-6/core/session'

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name createdAt',
  secretField: 'password',

  // TEMPORAL: activo en producción para crear el primer admin vía /init — revertir tras crear el usuario
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
})

const sessionMaxAge = 60 * 60 * 24 * 30 // 30 días

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: process.env.SESSION_SECRET,
})

export { withAuth, session }
