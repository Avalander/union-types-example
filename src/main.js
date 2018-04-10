import UnionType from './union-type'

const Ponies = UnionType('Ponies', [
	'EarthPony',
	'Pegasus',
	'Unicorn',
])

const twilight_sparke = Ponies.Unicorn({
	name: 'Twilight Sparkle',
	spell: 'Levitation',
})

const result = twilight_sparke.match({
	Unicorn: ({ name, spell }) => `${name} uses ${spell}!`
})

console.log(result)