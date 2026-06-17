import type { ListAccessArgs } from '.keystone/types'

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session
}

// Lectura pública, escritura solo autenticado
export const publicReadAdminWrite = {
  operation: {
    query:  () => true,
    create: isSignedIn,
    update: isSignedIn,
    delete: isSignedIn,
  },
}

// Creación pública, lectura solo de publicados para anónimos, escritura admin
export const publicCreatePublishedReadAdminWrite = {
  operation: {
    query:  () => true,
    create: () => true,
    update: isSignedIn,
    delete: isSignedIn,
  },
  filter: {
    query: ({ session }: any) =>
      session ? {} : { published: { equals: true } },
  },
}

// Todo requiere sesión (para gestión de usuarios)
export const adminOnly = {
  operation: {
    query:  isSignedIn,
    create: isSignedIn,
    update: isSignedIn,
    delete: isSignedIn,
  },
}
