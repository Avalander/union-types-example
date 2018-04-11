import React from 'react'
import ReactDOM from 'react-dom'

import UnionType from '../../src/union-type'


const RemoteData = UnionType('RemoteData', [
	'NotAsked',
	'Pending',
	'Success',
	'Failure',
])

const fetchPony = () => new Promise((resolve, reject) =>
	setTimeout(() => {
		if (Math.random() > 0.2) {
			return resolve({
				name: 'Twilight Sparkle',
				type: 'Unicorn',
				element: 'Magic',
			})
		}
		return reject({
			message: 'I just don\'t know what went wrong.',
		})
	},
	500)
)

class Pony extends React.Component {
	constructor(props) {
		super(props)
		this.state = { data: RemoteData.NotAsked() }
		this.fetchData = this.fetchData.bind(this)
	}

	fetchData() {
		this.setState({ data: RemoteData.Pending() })
		fetchPony()
			.then(pony => this.setState({ data: RemoteData.Success(pony) }))
			.catch(error => this.setState({ data: RemoteData.Failure(error) }))
	}

	render() {
		return this.state.data.match({
			NotAsked: () => (
				<div>
					<h1>Data not asked</h1>
					<button onClick={this.fetchData}>Load Pony</button>
				</div>
			),
			Pending: () => (
				<div>
					<h1>Loading...</h1>
				</div>
			),
			Success: ({ name, type, element }) => (
				<div>
					<span><strong>Name:</strong> {name}</span><br />
					<span><strong>Type:</strong> {type}</span><br />
					<span><strong>Element of Harmony:</strong> {element}</span><br />
					<button onClick={this.fetchData}>Reload</button>
				</div>
			),
			Failure: ({ message }) => (
				<div>
					<span>{message}</span><br />
					<button onClick={this.fetchData}>Retry</button>
				</div>
			)
		})
	}
}

ReactDOM.render(
	<Pony />,
	document.querySelector('#app')
)