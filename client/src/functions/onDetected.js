export const onDetected = (result, setResult) => {
	if (isNaN(result.slice(-1))) {
		const removedLastChar = result.substring(0, result.length - 1);
		setResult(removedLastChar);
		return;
	}
	setResult(result);
};
