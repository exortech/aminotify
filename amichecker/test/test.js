import test from 'ava'

const index = require('../index')

const context = {}
const cb = () => {}

test('check ami', t => {
  return index.handler({ }, context, cb).then(results => {
    t.is(Object.keys(results).length, 2)
    t.truthy(results['us-west-2'])
    t.truthy(results['us-east-2'])
  })
})
