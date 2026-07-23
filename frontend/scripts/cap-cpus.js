// Limita el nº de CPUs que Node reporta, para que `next build` genere menos
// páginas en paralelo. Al pre-renderizar los 22 locales (generateStaticParams),
// cada página hace ~5 fetches GraphQL; con muchos workers en paralelo la ráfaga
// satura el backend Render (0.1 CPU / free) → timeouts → páginas generadas como
// 404. Capando a pocas CPUs, la generación se serializa y el backend aguanta.
// Se carga vía NODE_OPTIONS="--require ./scripts/cap-cpus.js" en el cf:build.
const os = require('os')
const CAP = Number(process.env.BUILD_CPU_CAP || 2)
const realCpus = os.cpus.bind(os)
os.cpus = function () {
  const list = realCpus()
  return list.slice(0, Math.min(CAP, list.length))
}
if (typeof os.availableParallelism === 'function') {
  os.availableParallelism = () => CAP
}
