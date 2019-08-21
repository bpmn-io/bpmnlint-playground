import fs from 'fs';
import path from 'path';
import os from 'os';

import exitHook from 'exit-hook';

import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

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


console.log('Opening playground...');

export default {
  input: '.bpmnlintrc',
  output: {
    format: 'iife',
    name: 'bpmnlintConfig',
    file: tmpConfigFile,
    exports: 'named'
  },
  plugins: [
    resolve(),
    commonjs(),
    bpmnlint(),
    serve({
      openPage: `/?linting=1${diagram ? `&diagram=${encodeURIComponent(diagram)}` : ''}`,
      open: true,
      contentBase: [
        process.cwd(),
        tmpPublicDir,
        publicDir
      ],
    }),
    livereload({
      watch: tmpPublicDir
    })
  ],
  watch: {
    clearScreen: false
  }
};