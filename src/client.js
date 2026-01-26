import lintModule from 'bpmn-js-bpmnlint';

import BpmnModeler from 'bpmn-js/lib/Modeler';

import defaultDiagramXML from '../diagrams/example.bpmn';

import fileDrop from 'file-drops';

import download from 'downloadjs';


function loadConfig() {
  return import('./bpmnlint-config.js').catch(err => {
    console.error('Failed to load bpmnlint configuration', err);

    return {};
  });
}

function run(bpmnlintConfig) {

  var modeler = new BpmnModeler({
    container: '#canvas',
    additionalModules: [
      lintModule
    ],
    linting: {
      bpmnlint: bpmnlintConfig,
      active: getUrlParam('linting')
    }
  });

  var importDiagram = function(xml) {
    return modeler.importXML(xml).catch(err => {
      window.alert(err.message);

      throw err;
    });
  };

  loadDiagram().then(importDiagram).catch(err => {
    console.error('Failed to open diagram', err);
  });

  modeler.on('linting.toggle', function(event) {

    var active = event.active;

    setUrlParam('linting', active);
  });

  modeler.on('import.parse.start', function(event) {
    var xml = event.xml;

    window.localStorage.setItem('diagramXML', xml);
  });

  var dndHandler = fileDrop('Drop BPMN Diagram here.', function(files) {
    importDiagram(files[0].contents).catch(err => {
      console.error('Failed to open diagram', err);
    });
  });

  document.querySelector('#download-button').addEventListener('click', function(event) {

    modeler.saveXML({ format: true }).then(function(result) {
      download(result.xml, 'diagram.bpmn', 'application/xml');
    }).catch(err => {
      console.error('Failed to save diagram', err);
    });
  });

  document.querySelector('body').addEventListener('dragover', dndHandler);

}


loadConfig().then(run);

// helpers /////////////////////////////////

function setUrlParam(name, value) {

  var url = new URL(window.location.href);

  if (value) {
    url.searchParams.set(name, 1);
  } else {
    url.searchParams.delete(name);
  }

  window.history.replaceState({}, null, url.href);
}

function getUrlParam(name) {
  var url = new URL(window.location.href);

  return url.searchParams.get(name);
}

async function loadDiagram() {

  var diagramURL = getUrlParam('diagram');

  if (diagramURL) {
    return fetch(diagramURL).then(r => {
      if (r.ok) {
        return r.text();
      }

      throw new Error('failed to load ' + diagramURL);
    });
  }

  var diagramXML = window.localStorage.getItem('diagramXML');

  if (diagramXML) {
    return diagramXML;
  }

  return defaultDiagramXML;
}