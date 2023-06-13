import path from 'node:path';
import url from 'node:url';

import { watch as rollupWatch } from 'rollup';

import {
  loadConfigFile as loadRollupConfig
} from 'rollup/dist/loadConfigFile.js';

import exitHook from 'exit-hook';


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export async function run(diagram) {
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

  const watcher = rollupWatch(watchOptions);

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