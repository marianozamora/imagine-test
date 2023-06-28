export const textToCapitalize = (text) => {
	return text.charAt(0).toUpperCase() + text.slice(1);
};

export const priceFormat = (price) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price);
};

export const quantityFormat = (quantity) => {
	return new Intl.NumberFormat("en-US", {
		style: "unit",
		unit: "unit",
		unitDisplay: "long",
	}).format(quantity);
};

export const dateFormat = (dateString) => {
	const date = new Date(dateString);
	const currentDate = new Date();

	// Calculate the difference in milliseconds between the dates
	const diffMilliseconds = currentDate - date;

	// Calculate the difference in minutes
	const diffMinutes = Math.floor(diffMilliseconds / (60 * 1000));

	if (diffMinutes < 1) {
		return "Just now";
	} else if (diffMinutes < 60) {
		return `${diffMinutes} minutes ago`;
	} else if (diffMinutes < 1440) {
		const diffHours = Math.floor(diffMinutes / 60);
		return `${diffHours} hours ago`;
	} else if (diffMinutes < 10080) {
		const diffDays = Math.floor(diffMinutes / 1440);
		return `${diffDays} days ago`;
	} else {
		// Format the date using a specific format if it's more than 7 days ago
		const options = { year: "numeric", month: "long", day: "numeric" };
		return date.toLocaleDateString("en-US", options);
	}
};
