const UnionType = require('../union-type')

const authorise = token => true


const ApiErrors = UnionType('ApiErrors', [
	'InvalidCredentials',
	'NotFound',
	'Other',
])

module.exports = db => (req, res) =>
	new Promise((resolve, reject) =>
		authorise(req.bearer)
			? resolve()
			: reject(ApiErrors.InvalidCredentials())
		)
		.then(() =>
			new Promise((resolve, reject) =>
				db.collection('ponies').findOne({ id: req.params.id }, (err, data) => {
					if (err) reject(ApiErrors.Other(err))
					if (data == null) reject(ApiErrors.NotFound(`Pony ${req.params.id} not found.`))
					resolve(data)
				})
			)
		)
		.then(pony => res.json(pony))
		.catch(err => err.match({
			InvalidCredentials: () => res.sendStatus(401),
			NotFound: message => res.status(404).send(message),
			Other: data => res.status(500).send(data),
		}))
