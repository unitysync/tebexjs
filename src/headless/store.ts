import type { IStore, StoreResponse, Page } from '@/types/headless/store'
import { Headless } from '.'

class Store extends Headless implements IStore {
	constructor(protected publicToken: string) {
		if (!publicToken || typeof publicToken !== 'string') {
			throw new Error('Invalid Token')
		}

		super()
		this.publicToken = publicToken
		this.baseUrl = 'https://headless.tebex.io/api'
	}

	public async getWebstore(): Promise<StoreResponse> {
		return await this.request<StoreResponse>('/accounts/{token}')
	}

	public async getPages(): Promise<Page[]> {
		return await this.request<Page[]>('/accounts/{token}/pages')
	}
}

export { Store }
