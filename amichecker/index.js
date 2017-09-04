const locator = require('ubuntu-ami-locator')

const regions = [
  'us-west-2',
  'us-east-2'
]

const makeQuery = () => {
  return {
    suite: 'xenial',
    stream: 'server',
    tag: 'release',
    itype: 'ebs-ssd',
    current: true,
    virttype: 'hvm'
  }
}

const getLatestAmis = (query) => {
  return new Promise((resolve, reject) => {
    locator.query(query).on('end', function (data) {
      console.log('ubuntu-ami-locator query success:', data.length)
      resolve(data)
    }).on('error', function (err) {
      console.log('ubuntu-ami-locator query failed:', err)
      reject(err)
    })
  })
}

exports.handler = (event, context, callback) => {
  return getLatestAmis(makeQuery()).then(results => {
    const amis = results.reduce((memo, r) => {
      if (regions.includes(r.region)) {
        memo[r.region] = r
      }
      return memo
    }, {})
    callback(null, amis)
    return amis
  }).catch(err => {
    console.log(err)
    callback(err)
  })
}
