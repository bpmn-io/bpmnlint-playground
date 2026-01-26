const {
  is
} = require('bpmnlint-utils');


/**
 * Rule that reports that start events must be magic.
 */
module.exports = function() {

  function check(node, reporter) {
    if (is(node, 'bpmn:StartEvent') && node.get('spell:magic') !== true) {
      reporter.report(node.id, 'Element must be magic');
    }
  }

  return {
    check: check
  };
};
