/*
import union from './union-type'


const Ponies = union('Ponies', [
	'EarthPony',
	'Pegasus',
	'Unicorn',
])
*/
import Ponies from './pony'


Ponies.Pegasus({ name: 'Rainbow Dash', speed: 23 }).match({
	EarthPony: ({ name }) => name,
	Unicorn: ({ name }) => name,
	Pegasus: ({ name, speed }) => name,
})

const twilight_sparke = Ponies.Unicorn({
	name: 'Twilight Sparkle',
	spell: 'Levitation',
})

const result = twilight_sparke.match({
	Unicorn: ({ name, spell }) => `${name} uses ${spell}!`
})

console.log(result)
