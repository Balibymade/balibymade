// Limita el nº de CPUs que Node reporta, para que Next.js/webpack lancen menos
// workers de build. La máquina de build de Render tiene muchos núcleos; la fase
// "Collecting page data" de Next lanza un worker por núcleo y cada uno carga el
// sistema Keystone completo → el build revienta a >8GB.
//
// Se carga vía NODE_OPTIONS="--require ..." en TODOS los procesos node del build
// (compilación Y workers de page-data), a diferencia de `taskset`, que solo
// limita la afinidad de CPU (os.availableParallelism) pero NO os.cpus().length,
// que es lo que lee el pool de workers de generación estática de Next.
//
// Inofensivo en local (macOS pocos núcleos): capar a 2 no cambia nada allí.
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
