# bpmnlint-playground

A playground to implement and try out [bpmnlint](https://github.com/bpmn-io/bpmnlint) diagram validation rules.

![playground](./docs/screenshot.png)


## Run the Playground

```
npm install

npm start
```

This opens the playground in your browser.


## Configure Rules

Configure rules via the [`.bpmnlintrc`](.bpmnlintrc) file.


## Start Hacking

Create or modify rules in the [`plugin/rules`](./plugin/rules) directory.

Expose default configurations via the [plugin entry point](./plugin/index.js).

Save your modifications. See the playground reload reflect your changes in real-time :rocket:.


## Resources

* [bpmnlint](https://github.com/bpmn-io/bpmnlint)
* [bpmnlint-plugin-example](https://github.com/bpmn-io/bpmnlint-plugin-example)
* [bpmn-js-bpmnlint](https://github.com/bpmn-io/bpmn-js-bpmnlint)


## License

MIT