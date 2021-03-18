
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

/**
 *
 * @property {Express} app
 * @property {Number} port
 * @property {Boolean} applyCluster
 */
async function startServer({ app, port, applyCluster = false }) {
  
  if (cluster.isMaster && (applyCluster === 'APPLY')) {
    for (let i = 0; i < numCPUs - 1; i += 1) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    app.listen(port || 80);
  }

  console.log(`Server is listening on port ${port || 80}, NODE_ENV=${process.env.NODE_ENV}`);
}

module.exports = {
  startServer,
};
