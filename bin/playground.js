const path = require('path');

const rollup = require('rollup');
const loadRollupConfig = require('rollup/dist/loadConfigFile');

const exitHook = require('exit-hook');


async function run(diagram) {
  const rollupConfig = path.join(__dirname, '..', 'config', 'rollup.run-config.js');

  if (diagram) {
    // share diagram with app
    process.env.BPMNLINT_PLAYGROUND_OPEN_DIAGRAM = diagram;
  }

  const {
    options,
    warnings
  } = await loadRollupConfig(rollupConfig, { format: 'es' });

  warnings.flush();

  const watchOptions = options.map(options => ({
    ...options,
    onwarn(warning) {

      const {
        code,
        source
      } = warning;

      warnings.add(warning);
    }
  }));

  const watcher = rollup.watch(watchOptions);

  watcher.on('event', event => {

    const {
      result,
      error,
      code
    } = event;

    if (result) {
      result.close();
    }

    if (code === 'ERROR') {
      warnings.add(error);
    }

    if (code === 'END') {
      console.log(warnings.count > 0 ? 'Bundling failed.' : 'Bundled.');

      warnings.flush();
    }
  });

  exitHook(() => {
    watcher.close();
  });
}


module.exports.run = run;