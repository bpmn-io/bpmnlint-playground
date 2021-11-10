module.exports = {
  configs: {
    recommended: {
      rules: {
        'local/target-namespace': 'error',
        'local/no-manual-task': 'warn'
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