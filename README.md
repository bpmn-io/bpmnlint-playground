# bpmnlint-playground

[![CI](https://github.com/bpmn-io/bpmnlint-playground/actions/workflows/CI.yml/badge.svg)](https://github.com/bpmn-io/bpmnlint-playground/actions/workflows/CI.yml)

A playground to try out [bpmnlint](https://github.com/bpmn-io/bpmnlint) diagram validation and implement and new rules.

![playground](./docs/screenshot.png)


## Run the Playground

```
npx bpmnlint-playground
```


## Features

### Test your bpmnlint Configuration

Run the playground in any directory with a `.bpmnlintrc` file:

```
npx bpmnlint-playground
```

It will watch your local [`.bpmnlintrc`](https://github.com/bpmn-io/bpmnlint#configuration) as linked rules.


### Create and Test your bpmnlint Plug-in

Run the playground in a bpmnlint plug-in project and test rules in action.

```
# create a plugin with the name <foo>
npx create-bpmnlint-plugin foo && cd foo

# install dependencies
npm install

# run playground
npx bpmnlint-playground
```

It will watch your local [`.bpmnlintrc`](https://github.com/bpmn-io/bpmnlint#configuration) as well as your plug-in assets and refresh accordingly.


## Resources

* [bpmnlint](https://github.com/bpmn-io/bpmnlint)
* [bpmnlint-plugin-example](https://github.com/bpmn-io/bpmnlint-plugin-example)
* [create-bpmnlint-plugin](https://github.com/nikku/create-bpmnlint-plugin)
* [bpmn-js-bpmnlint](https://github.com/bpmn-io/bpmn-js-bpmnlint)


## License

MIT
