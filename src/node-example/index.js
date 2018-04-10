const mongodb = require('mongodb')
const express = require('express')

const makeGetPonies = require('./get-ponies')

const app = express()

mongodb.MongoClient.connect(DB_URL)
	.then(client => client.db(DB_NAME))
	.then(db => {
		app.get('/ponies/:id', makeGetPonies(db))
		app.listen(3000, () => 'Server started.')
	})