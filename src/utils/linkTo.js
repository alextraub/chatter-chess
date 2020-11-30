export default function linkTo(path, location, state={}) {
	return {
		pathname: path,
		state: {
			...state,
			from: location.pathname
		}
	}
}
