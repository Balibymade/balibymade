/**
 * migrate-safe.js
 * Ejecuta prisma migrate deploy. Si hay migraciones fallidas (P3009),
 * las resuelve automáticamente y reintenta. Evita bloqueos en Render.
 */
const { spawnSync } = require('child_process')

function migrateDeployOnce() {
  const result = spawnSync('npx', ['prisma', 'migrate', 'deploy'], {
    encoding: 'utf-8',
    stdio: ['inherit', 'pipe', 'pipe'],
  })

  const output = (result.stdout || '') + (result.stderr || '')
  process.stdout.write(output)

  if (result.status === 0) return true

  // Detectar migraciones fallidas en el output de error
  const matches = [...output.matchAll(/The `([^`]+)` migration.*?failed/g)]
  for (const [, name] of matches) {
    console.log(`[migrate-safe] Resolviendo migración fallida: ${name}`)
    spawnSync('npx', ['prisma', 'migrate', 'resolve', '--rolled-back', name], {
      stdio: 'inherit',
    })
  }

  return false
}

// Intento 1: detecta y resuelve migraciones fallidas
// Intento 2: deploy limpio tras resolver
for (let i = 0; i < 2; i++) {
  if (migrateDeployOnce()) {
    console.log('[migrate-safe] Migraciones aplicadas correctamente.')
    process.exit(0)
  }
}

console.error('[migrate-safe] No se pudieron aplicar las migraciones.')
process.exit(1)
