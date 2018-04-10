const UnionType = (name, types) =>
	types.reduce((prev, type) => ({
		...prev,
		[type]: data => ({
			inspect: () => `${name}.${type}(${data})`,
			match: fns => fns[type](data),
		})
	}))

export default UnionType
