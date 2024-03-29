#!/usr/bin/env node

import path from 'node:path';
import fs from 'node:fs';

const bpmnlintrcPath = path.join(process.cwd(), '.bpmnlintrc');

import colors from 'ansi-colors';

import colorSupport from 'color-support';

colors.enabled = colorSupport.hasBasic;


import { run as runPlayground } from './playground.js';

const {
  magenta,
  bold,
  grey
} = colors;

async function getLocalPluginName() {

  try {
    const pkg = await import(process.cwd() + '/package.json');

    const name = pkg.name;

    const match = /^bpmnlint-plugin-(.*)$/.exec(name);

    if (match) {
      return match[1];
    }
  } catch (err) {
    // ignore
  }

  return null;
}


function cmd(str) {
  return bold(magenta(str));
}

function highlight(str) {
  return bold(str);
}

async function run() {

  const argv = process.argv.slice(2);

  const [ arg ] = argv;

  if (arg === '--help') {
    console.log(`usage: bpmnlint-playground [diagram]`);

    return;
  }

  if (!fs.existsSync(bpmnlintrcPath)) {

    const pluginName = await getLocalPluginName();

    console.error(`
  Cannot not find local ${highlight('.bpmnlintrc')} file, please create one:

    ${cmd('npx bpmnlint --init')}

  Refer to https://github.com/bpmn-io/bpmnlint#configuration for details.
  `);

    if (pluginName) {
      console.error(`
  Alternatively, initialize a config based on this plug-ins ${highlight(`recommended`)} rules:

    ${cmd(`echo '{ "extends": "plugin:${pluginName}/recommended" }' > .bpmnlintrc`)}
        `)
    } else {
      console.error(`
  Alternatively, create a new bpmnlint-plugin first:

    ${cmd('npx create-bpmnlint-plugin my-plugin')}

  Refer to https://github.com/nikku/create-bpmnlint-plugin#usage for usage.
      `);
    }

    return process.exit(1);
  }

  if (arg) {

    const relativePath = path.relative(process.cwd(), path.resolve(arg));

    if (relativePath.startsWith('../')) {
      console.error(`diagram <${arg}> must be within working directory`);

      return process.exit(1);
    }

    if (!fs.existsSync(arg)) {
      console.error(`diagram <${arg}> does not exist`);

      return process.exit(1);
    }

  }

  console.log('Opening playground...');

  return runPlayground(arg);
}


run().catch(err => {
  console.error('failed to start bpmnlint-playground', err);

  process.exit(1);
});