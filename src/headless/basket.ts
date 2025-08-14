import type { AuthLink, BasketResponse, IBasket } from '@/types/headless';
import { Headless } from '.'

/**
 * A client for interacting with the Tebex Headless API, specifically for managing a shopping basket.
 * This class handles all API requests related to a basket, including adding/removing items and applying codes.
 */
class Basket extends Headless implements IBasket {
	protected readonly publicToken: string
	public ident: string = ''

	/**
	 * Creates a new instance of the Basket client and immediately creates a new basket
	 * on the Tebex platform using the provided public token.
	 * @param {string} publicToken - The Tebex public token for the store.
	 */
	constructor(publicToken: string) {
		super()
		this.publicToken = publicToken
		this.baseUrl = 'https://headless.tebex.io/api'

		this.request<BasketResponse>('/accounts/{token}/baskets', 'POST')
			.then((data) => {
				this.ident = data.ident ?? '';
			})
			.catch((err) => {
				throw new Error(err);
			});
	}

	/**
	 * Retrieves the authentication links for the current basket.
	 * @async
	 * @param {string} returnUrl - The URL to redirect the user to after authentication.
	 * @returns {Promise<AuthLink[]>} A promise that resolves with an array of authentication links.
	 * @throws {string} Rejects if `returnUrl` is not provided.
	 */
	public async getAuthLinks(returnUrl: string): Promise<AuthLink[]> {
		if (!returnUrl) return Promise.reject('Return URL not provided');

		return await this.request(
			'/accounts/{token}/baskets/{basketIdent}/auth?returnUrl=' +
				encodeURIComponent(returnUrl),
		);
	}

	/**
	 * Fetches the current state of the basket.
	 * @async
	 * @returns {Promise<BasketResponse>} A promise that resolves with the basket's details.
	 */
	public async getBasket(): Promise<BasketResponse> {
		return await this.request(
			'/accounts/{token}/baskets/{basketIdent}',
			'GET',
		);
	}

	/**
	 * Applies a creator code to the basket.
	 * @async
	 * @param {string} code - The creator code to apply.
	 * @returns {Promise<void>} A promise that resolves when the operation is complete.
	 * @throws {string} Rejects if `code` is not provided.
	 */
	public async applyCreatorCode(code: string): Promise<void> {
		if (!code) return Promise.reject('Creator code not provided');

		return await this.request(
			'/accounts/{token}/baskets/{basketIdent}/creator-codes',
			'POST',
			{
				creator_code: code,
			},
		);
	}

	/**
	 * Removes a previously applied creator code from the basket.
	 * @async
	 * @returns {Promise<void>} A promise that resolves when the operation is complete.
	 */
	public async removeCreatorCode(): Promise<void> {
		return await this.request(
			'/accounts/{token}/baskets/{basketIdent}/creator-codes/remove',
			'POST',
		);
	}

	/**
	 * Applies a gift card to the basket.
	 * @async
	 * @param {string} code - The gift card code.
	 * @returns {Promise<void>} A promise that resolves when the operation is complete.
	 * @throws {string} Rejects if `code` is not provided.
	 */
	public async applyGiftCard(code: string): Promise<void> {
		if (!code) return Promise.reject('Gift card code not provided');

		return await this.request(
			'/accounts/{token}/baskets/{basketIdent}/giftcards',
			'POST',
			{
				card_number: code,
			},
		);
	}

	/**
	 * Removes a gift card from the basket.
	 * @async
	 * @param {string} code - The gift card code to remove.
	 * @returns {Promise<void>} A promise that resolves when the operation is complete.
	 * @throws {string} Rejects if `code` is not provided.
	 */
	public async removeGiftCard(code: string): Promise<void> {
		if (!code) return Promise.reject('Gift card code not provided');

		return await this.request(
			'/accounts/{token}/baskets/{basketIdent}/giftcards/remove',
			'POST',
			{
				card_number: code,
			},
		);
	}

	/**
	 * Applies a coupon to the basket.
	 * @async
	 * @param {string} code - The coupon code to apply.
	 * @returns {Promise<void>} A promise that resolves when the operation is complete.
	 * @throws {string} Rejects if `code` is not provided.
	 */
	public async applyCoupon(code: string): Promise<void> {
		if (!code) return Promise.reject('Coupon code not provided');

		return await this.request(
			'/accounts/{token}/baskets/{basketIdent}/coupons',
			'POST',
			{
				coupon_code: code,
			},
		);
	}

	/**
	 * Removes a coupon from the basket.
	 * @async
	 * @returns {Promise<void>} A promise that resolves when the operation is complete.
	 */
	public async removeCoupon(): Promise<void> {
		return await this.request(
			'/accounts/{token}/baskets/{basketIdent}/coupons/remove',
			'POST',
		);
	}

	/**
	 * Adds a package to the basket.
	 * @async
	 * @param {string} packageId - The ID of the package to add.
	 * @param {number} [quantity=1] - The quantity of the package to add.
	 * @returns {Promise<void>} A promise that resolves when the operation is complete.
	 * @throws {string} Rejects if `packageId` is not provided.
	 */
	public async addPackage(
		packageId: string,
		quantity: number = 1,
	): Promise<void> {
		if (!packageId) return Promise.reject('Package ID not provided');

		return await this.request('/baskets/{basketIdent}/packages', 'POST', {
			package_id: packageId,
			quantity: quantity,
		});
	}

	/**
	 * Removes a package from the basket.
	 * @async
	 * @param {string} packageId - The ID of the package to remove.
	 * @returns {Promise<void>} A promise that resolves when the operation is complete.
	 * @throws {string} Rejects if `packageId` is not provided.
	 */
	public async removePackage(packageId: string): Promise<void> {
		if (!packageId) return Promise.reject('Package ID not provided');

		return await this.request(
			'/baskets/{basketIdent}/packages/remove',
			'POST',
			{
				package_id: packageId,
			},
		);
	}

	/**
	 * Updates the quantity of a package in the basket.
	 * @async
	 * @param {string} packageId - The ID of the package to update.
	 * @param {number} [quantity=1] - The new quantity for the package.
	 * @returns {Promise<void>} A promise that resolves when the operation is complete.
	 * @throws {string} Rejects if `packageId` or `quantity` is not provided.
	 */
	public async updateQuantity(
		packageId: string,
		quantity: number = 1,
	): Promise<void> {
		if (!packageId) return Promise.reject('Package ID not provided');
		if (!quantity) return Promise.reject('Quantity not provided');

		return await this.request(
			'/baskets/{basketIdent}/packages/update',
			'PUT',
			{
				package_id: packageId,
				quantity: quantity,
			},
		);
	}
}

export { Basket };
