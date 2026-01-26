const { expect } = require('chai');

const spellModdle = require('spell-moddle/resources/spell.json');

const { createModdle } = require('bpmnlint/lib/testers/helper');

const RuleTester = require('bpmnlint/lib/testers/rule-tester');

const manualTaskRule = require('./rules/no-manual-task');
const targetNamespaceRule = require('./rules/target-namespace');
const magicStartEventRule = require('./rules/magic-start-event');

const BpmnModdle = require('bpmn-moddle');


RuleTester.verify('no-manual-task', manualTaskRule, {
  valid: [
    {
      moddleElement: createModdle(
        '<startEvent xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" id="startEvent" />',
        'bpmn:StartEvent'
      )
    }
  ],
  invalid: [
    {
      moddleElement: createModdle(
        '<manualTask xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" id="manualTask" />',
        'bpmn:ManualTask'
      ),
      report: {
        id: 'manualTask',
        message: 'Element has disallowed type bpmn:ManualTask'
      }
    }
  ]
});


RuleTester.verify('target-namespace', targetNamespaceRule, {
  valid: [
    {
      moddleElement: createModdle(
        '<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" id="definitions" targetNamespace="http://foo" />',
      )
    }
  ],
  invalid: [
    {
      moddleElement: createModdle(
        '<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" id="definitions" />',
      ),
      report: {
        id: 'definitions',
        message: 'Element is missing targetNamespace'
      }
    }
  ]
});

async function createMagicModdle(xml, elementType) {

  const moddle = new BpmnModdle({ spell: spellModdle });

  const {
    rootElement,
    warnings
  } = await moddle.fromXML(xml, elementType || 'bpmn:Definitions');

  return {
    root: rootElement,
    moddle,
    warnings
  };
}

RuleTester.verify('magic-start-event', magicStartEventRule, {
  valid: [
    {
      moddleElement: createMagicModdle(
        '<startEvent xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:s="http://example.magic/schema/spell" id="startEvent" s:magic="true" />',
        'bpmn:StartEvent'
      )
    }
  ],
  invalid: [
    {
      moddleElement: createMagicModdle(
        '<startEvent xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" id="startEvent" />',
        'bpmn:StartEvent'
      ),
      report: {
        id: 'startEvent',
        message: 'Element must be magic'
      }
    }
  ]
});

