import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';

import { string } from 'rollup-plugin-string';

import bpmnlint from 'rollup-plugin-bpmnlint';

const publicDir = 'public';

export default [
  {
    input: 'src/client.js',
    external: [ './bpmnlint-config.js'],
    output: {
      sourcemap: true,
      format: 'iife',
      name: 'BpmnlintPlayground',
      file: `${publicDir}/client.js`
    },
    plugins: [
      string({
        include: '**/*.bpmn'
      }),
      resolve(),
      commonjs(),
      copy({
        targets: [
          { src: 'src/index.html', dest: publicDir },
          { src: 'node_modules/bpmn-js/dist/assets', dest: `${publicDir}/assets/bpmn-js` },
          { src: 'node_modules/bpmn-js-bpmnlint/dist/assets', dest: `${publicDir}/assets/bpmn-js-bpmnlint` }
        ]
      })
    ]
  },
  {
    input: 'src/.bpmnlintrc',
    output: {
      sourcemap: true,
      format: 'es',
      file: `${publicDir}/bpmnlint-config.js`
    },
    plugins: [
      resolve(),
      commonjs(),
      bpmnlint()
    ]
  }
];
