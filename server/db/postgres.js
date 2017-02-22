import promiseLib from 'bluebird'
import pg from 'pg-promise'
import config from '../config'

export default pg({promiseLib})(config.postgres.url)
