import fs from 'fs';
import path from 'path';
import os from 'os';

import exitHook from 'exit-hook';

import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import bpmnlint from 'rollup-plugin-bpmnlint';

const publicDir = path.join(__dirname, '..', 'public');

const tmpPublicDir = fs.mkdtempSync(path.join(os.tmpdir(), 'bpmnlint-playground-'));

const tmpConfigFile = path.join(tmpPublicDir, 'bpmnlint-config.js');

exitHook(() => {
  console.log('Cleaning up...');

  if (fs.existsSync(tmpConfigFile)) {
    fs.unlinkSync(tmpConfigFile);
  }

  fs.rmdirSync(tmpPublicDir);
});

const diagram = process.env.BPMNLINT_PLAYGROUND_OPEN_DIAGRAM;

export default {
  input: '.bpmnlintrc',
  output: {
    format: 'es',
    file: tmpConfigFile
  },
  plugins: [
    resolve(),
    commonjs(),
    bpmnlint(),
    serve({
      verbose: false,
      openPage: `/?linting=1${diagram ? `&diagram=${encodeURIComponent(diagram)}` : ''}`,
      open: true,
      contentBase: [
        tmpPublicDir,
        process.cwd(),
        publicDir
      ],
    }),
    livereload({
      watch: tmpPublicDir,
      verbose: false
    })
  ],
  watch: {
    clearScreen: false
  }
};