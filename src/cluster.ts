import cluster from "cluster"
import { cpus } from "os"

const countCP = cpus().length

if (cluster.isPrimary) {
  console.log(`${countCP} forks`)
  console.log(`Pid: ${process.pid}`)

  for (let i = 0; i < countCP; i++) cluster.fork()
}

if (cluster.isWorker) {
  import("./index.js")
}
