export default function redirect(path, location, history, state={}, condition=() => true, fallbackPath='/', fallbackCondition=() => false) {
	if(condition()) {
		const rPath = fallbackCondition() ? fallbackPath : path;
		history.push(rPath, {
			...state,
			from: location.pathname
		});
		return true;
	}

	return false;
}
