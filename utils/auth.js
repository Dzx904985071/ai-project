export function getItem(itemName) {
	return sessionStorage.getItem(itemName);
}

export function setItem(itemName, itemValue) {
	sessionStorage.setItem(itemName, itemValue);
}

export function removeItem(itemName) {
	sessionStorage.removeItem(itemName);
}
