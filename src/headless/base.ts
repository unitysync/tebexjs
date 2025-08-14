abstract class Headless {
	protected baseUrl!: string
	protected publicToken?: string
	protected basketIdent?: string

	/**
	 * Internal asynchronous method to handle Basket API requests.
	 * It handles URL path replacement, sets headers, and performs the fetch request.
	 * @private
	 * @async
	 * @param {string} path - The API endpoint path with placeholders (e.g., '/accounts/{token}/baskets/{basketIdent}').
	 * @param {string} [method='GET'] - The HTTP method to use for the request.
	 * @param {Record<string, any>} [body] - The request body data, if any.
	 * @returns {Promise<any>} A promise that resolves with the parsed JSON response.
	 * @throws {string} Throws an error message if the network request fails or the response status is not OK.
	 */
	protected async request<T = unknown>(
		path: string,
		method: string = 'GET',
		body?: Record<string, unknown>,
	): Promise<T> {
		const route = path
			.replace(/{token}/g, this.publicToken ?? '')
			.replace(/{basketIdent}/g, this.basketIdent ?? '')

		const response = await fetch(this.baseUrl + route, {
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})

		if (!response.ok) {
			return Promise.reject(
				`Request failed with status ${response.status}: ${response.statusText}`,
			)
		}

		return await response.json()
	}
}

export { Headless }
