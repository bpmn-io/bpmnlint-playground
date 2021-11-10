const path = require('path');

const rollup = require('rollup');
const loadRollupConfig = require('rollup/dist/loadConfigFile');

const exitHook = require('exit-hook');

class Hints {
  constructor() {
    this._h = [];
  }

  add(hint) {
    this._h.push(hint);
  }

  flush() {
    this._h.map(hint => {
      console.log(hint);
    });

    this._h.length = 0;
  }
}


async function run(diagram) {
  const rollupConfig = path.join(__dirname, '..', 'config', 'rollup.run-config.js');

  // share diagram with app
  process.env.BPMNLINT_PLAYGROUND_OPEN_DIAGRAM = diagram;

  const {
    options,
    warnings
  } = await loadRollupConfig(rollupConfig, { format: 'es' });

  warnings.flush();

  const hints = new Hints();

  const watchOptions = options.map(options => ({
    ...options,
    onwarn(warning) {

      const {
        code,
        source
      } = warning;

      console.log(warning);
      warnings.add(warning);
    }
  }));

  const watcher = rollup.watch(watchOptions);

  watcher.on('event', event => {

    const {
      result,
      code
    } = event;

    if (result) {
      result.close();
    }

    if (code === 'ERROR') {
      console.log(event);
    }

    if (code === 'END') {
      warnings.flush();
    }
  });

  exitHook(() => {
    watcher.close();
  });
}


module.exports.run = run;