module.exports = {
  configs: {
    recommended: {
      rules: {
        'local/target-namespace': 'error'
      }
    },
    all: {
      rules: {
        'local/target-namespace': 'warn',
        'local/no-manual-task': 'warn'
      }
    }
  }
}