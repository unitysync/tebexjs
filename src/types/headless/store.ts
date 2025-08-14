type ISODateString = string & { readonly __isISODateString: unique symbol }

interface StoreResponse {
	id?: number
	description?: string
	name?: string
	webstore_url?: string
	currency?: string
	lang?: string
	logo?: string
	platform_type?: string
	platform_type_id?: string
	created_at?: ISODateString
}

interface Page {
	id?: number
	created_at?: ISODateString
	updated_at?: ISODateString
	account_id?: number
	title?: string
	slug?: string
	private?: boolean
	hidden?: boolean
	disabled?: boolean
	sequence?: boolean
	content?: string
}

interface IStore {
	getWebstore: () => Promise<StoreResponse>
	getPages: () => Promise<Page[]>
}

export type { IStore, StoreResponse, Page }
