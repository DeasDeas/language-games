export function standardErrorHandler(error, data= {}) {
	const messagesTexts = Object.values(error.response.data);

	const message = {
		texts: messagesTexts,
		type: "error",
		status: error.response.status,
	};

	return { data: data, message };
}