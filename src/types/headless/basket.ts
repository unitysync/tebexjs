type AuthLink = {
	name: string;
	url: string;
};

type Coupon = {
	coupon_code: string;
};

type GiftCard = {
	card_number: string;
};

type RevenueShare = {
	wallet_ref?: string;
	amount?: number;
	gateway_fee_percent?: number;
};

type Package = {
	qty?: number;
	type?: 'single' | 'subscription';
	revenue_share?: RevenueShare[];
};
type BasketResponse = {
	id?: number;
	ident?: string;
	complete?: boolean;
	email?: string;
	username?: string;
	coupon?: Coupon[];
	giftcards?: GiftCard[];
	creator_code?: string;
	cancel_url?: string;
	complete_url?: string;
	complete_auto_redirect?: boolean;
	country?: string;
	ip?: string;
	username_id?: number;
	base_price?: number;
	sales_tax?: number;
	total_price?: number;
	currency?: string;
	packages?: Package[];
};

interface IBasket {
	getAuthLinks(returnUrl: string): Promise<AuthLink[]>;
	getBasket(basketId?: string): Promise<BasketResponse>;

	applyCreatorCode(code: string): Promise<void>;
	removeCreatorCode(): Promise<void>;

	applyGiftCard(code: string): Promise<void>;
	removeGiftCard(code: string): Promise<void>;

	applyCoupon(code: string): Promise<void>;
	removeCoupon(): Promise<void>;

	addPackage(packageId: string, quantity: number): Promise<void>;
	removePackage(packageId: string): Promise<void>;
	updateQuantity(packageId: string, quantity: number): Promise<void>;
}

export type { IBasket, AuthLink, BasketResponse, Coupon, GiftCard };
