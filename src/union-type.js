export default (name, types) =>
	types.reduce((prev, type) => ({
		...prev,
		[type]: data => ({
			inspect: () => `${name}.${type}(${data})`,
			match: fns => fns[type](data),
		})
	}), {})
