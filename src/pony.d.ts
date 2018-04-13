declare namespace PonyType {
	interface EarthPonyData {
		name: string,
	}
	
	interface PegasusData {
		name: string,
		speed: number,
	}
	
	interface UnicornData {
		name: string,
		spell: string,
	}

	interface PonyMatcher {
		EarthPony: (data: EarthPonyData) => any,
		Pegasus: (data: PegasusData) => any,
		Unicorn: (data: UnicornData) => any,
	}

	const EarthPony: (data: EarthPonyData) => { match: (d: PonyMatcher) => any}
	const Pegasus: (data: PegasusData) => { match: (d: PonyMatcher) => any}
	const Unicorn: (data: UnicornData) => { match: (d: PonyMatcher) => any}
}

export = PonyType
