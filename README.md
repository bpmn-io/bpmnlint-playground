# bpmnlint-playground

[![CI](https://github.com/bpmn-io/bpmnlint-playground/actions/workflows/CI.yml/badge.svg)](https://github.com/bpmn-io/bpmnlint-playground/actions/workflows/CI.yml)

A playground to try out [bpmnlint](https://github.com/bpmn-io/bpmnlint) diagram validation and implement and new rules.

![playground](./docs/screenshot.png)


## Run the Playground

Run the playground in any directory with a `.bpmnlintrc` file:

```sh
npx bpmnlint-playground
```


During plug-in development the playground can be useful to test rules in action:

```sh
# create a plugin with the name <foo>
npx create-bpmnlint-plugin foo
cd bpmnlint-plugin-foo

# install dependencies
npm install

# load recommended rules
echo '{ "extends": "plugin:foo/recommended" }' > .bpmnlintrc

# run playground
npx bpmnlint-playground
```

Once started, the playground watches your local [`.bpmnlintrc` file](https://github.com/bpmn-io/bpmnlint#configuration), rebuilds it on change, and refreshes the view accordingly.


## Related

* [bpmnlint](https://github.com/bpmn-io/bpmnlint)
* [bpmnlint-plugin-example](https://github.com/bpmn-io/bpmnlint-plugin-example)
* [create-bpmnlint-plugin](https://github.com/nikku/create-bpmnlint-plugin)
* [bpmn-js-bpmnlint](https://github.com/bpmn-io/bpmn-js-bpmnlint)


## License

MIT
