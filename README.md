# bpmnlint-playground

A playground to implement and try out [bpmnlint](https://github.com/bpmn-io/bpmnlint) diagram validation rules.

![playground](./docs/screenshot.png)


## Run the Playground

To open the playground in your browser type

```
npm install
npm start
```


## Features

#### App

* Validate your diagrams
* Drop diagrams into the page to open them and trigger validation
* Apply changes and download the diagram

#### Rules

* Configure checked lint/validation rules via the [`.bpmnlintrc`](.bpmnlintrc) file
* Create or modify rules in the [`./plugin/rules`](./plugin/rules) directory
* Expose default configurations using the [plugin entry point](./plugin/index.js)
* See how rule changes are reflected in the app in real time


## Resources

* [bpmnlint](https://github.com/bpmn-io/bpmnlint)
* [bpmnlint-plugin-example](https://github.com/bpmn-io/bpmnlint-plugin-example)
* [bpmn-js-bpmnlint](https://github.com/bpmn-io/bpmn-js-bpmnlint)


## License

MIT
