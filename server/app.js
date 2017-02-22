import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import pg from './db/postgres'

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  pg.manyOrNone('SELECT * FROM users')
    .then(result => res.status(200).send(result))
    .catch(e => res.status(500).send(e))
})

app.get('/:id', (req, res) => {
  pg.one('SELECT * FROM users where id = $1', req.params.id)
    .then(result => res.status(200).send(result))
    .catch(e => res.status(500).send(e))
})

app.post('/', (req, res) => {
  pg.none('INSERT INTO users (name) VALUES (${name})', req.body)
    .then(result => res.status(200).send(result))
    .catch(e => res.status(500).send(e))
})

app.put('/:id', (req, res) => {
  pg.none('UPDATE users SET name=${name} where id=${id}', {...req.params, ...req.body})
    .then(result => res.status(200).send(result))
    .catch(e => res.status(500).send(e))
})

app.delete('/:id', (req, res) => {
  pg.none('DELETE FROM users where id = $1', req.params.id)
    .then(result => res.status(200).send(result))
    .catch(e => res.status(500).send(e))
})

app.get('*', (req, res) => res.end('404 healthy'))

export default app
