import { sql } from 'mongo-sql'

import pg from './postgres'

const dropTable = table => sql({ type: 'drop-table', table })

const createTable = table => sql({
  type: 'create-table',
  table: table,
  definition: {
    id: { type: 'serial', primaryKey: true },
    name: { type: 'text' },
    createdAt: { type: 'timestamp', default: 'now()' },
  }
})

export const seed = () => {
  console.log('-- Connecting')
  pg.connect()

  console.log('-- Seed users')
  pg.query(`
    ${dropTable('users').query};
    ${createTable('users').query};
    INSERT INTO users (name) VALUES ('Fred'), ('Chris'), ('Alex');
  `).then(() => {
    console.log('-- Complete')
  }).catch(e => {
    console.log('-- ERROR', e)
  }).finally(() => {
    process.exit()
  })
}

export default seed()
