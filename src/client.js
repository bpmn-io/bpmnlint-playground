import lintModule from 'bpmn-js-bpmnlint';

import BpmnModeler from 'bpmn-js/lib/Modeler';

import defaultDiagramXML from '../diagrams/example.bpmn';

import fileDrop from 'file-drops';

import download from 'downloadjs';


function loadConfig() {
  return import('./bpmnlint-config.js').catch(err => {
    console.log(err);

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

  loadDiagram().then(diagramXML => modeler.importXML(diagramXML)).catch(err => {
    window.alert(err.message);
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
    modeler.importXML(files[0].contents);
  });

  document.querySelector('#download-button').addEventListener('click', function(event) {

    modeler.saveXML({ format: true }, function(err, xml) {
      if (!err) {
        download(xml, 'diagram.bpmn', 'application/xml');
      }
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