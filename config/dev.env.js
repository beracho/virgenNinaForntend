var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost:4000/api/v1/"',
  AUTH_URL: '"http://localhost:4000/autenticar"',
  NO_AUTH_URL: '"http://localhost:4000/"',
  ONBEFOREUNLOAD: false,
  DEBUG_MODE: true
})
