import React from 'react'
import ReactDOM from 'react-dom'

import union from '../../src/union-type'


const RemoteData = union('RemoteData', [
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
					<p><strong>Name:</strong> {name}</p>
					<p><strong>Type:</strong> {type}</p>
					<p><strong>Element of Harmony:</strong> {element}</p>
					<button onClick={this.fetchData}>Reload</button>
				</div>
			),
			Failure: ({ message }) => (
				<div>
					<p>{message}</p>
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