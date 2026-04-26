import { BaseClass } from "@/share/models/class/base.class";

export class DiscoveryClass extends BaseClass {
	id: string;
	slug: string;
	type: TTypeDiscovery;
	title: string;
	status: string;
	apy_rate: number;
	end_date: string;
	created_at: string;
	creator_id: string;
	start_date: string;
	updated_at: string;
	description: string;
	goal_amount: number;
	raised_amount: number;
	min_investment: number;
	contract_address: string | null;
	creator_username: string;
	on_chain_pool_id: number | null;
	creator_avatar_url: string | null;
	staking_duration_days: number;

	constructor(data: Partial<DiscoveryClass>) {
		super();
		this.id = data.id ?? "";
		this.slug = data.slug ?? "";
		this.type = data.type ?? "";
		this.title = data.title ?? "";
		this.status = data.status ?? "";
		this.apy_rate = data.apy_rate ?? 0;
		this.end_date = data.end_date ?? "";
		this.created_at = data.created_at ?? "";
		this.creator_id = data.creator_id ?? "";
		this.start_date = data.start_date ?? "";
		this.updated_at = data.updated_at ?? "";
		this.description = data.description ?? "";
		this.goal_amount = data.goal_amount ?? 0;
		this.raised_amount = data.raised_amount ?? 0;
		this.min_investment = data.min_investment ?? 0;
		this.contract_address = data.contract_address ?? null;
		this.creator_username = data.creator_username ?? "";
		this.on_chain_pool_id = data.on_chain_pool_id ?? null;
		this.creator_avatar_url = data.creator_avatar_url ?? null;
		this.staking_duration_days = data.staking_duration_days ?? 0;
	}

	static toResponse(data: Partial<DiscoveryClass>[] = []): DiscoveryClass[] {
		return data.map(item => new DiscoveryClass(item));
	}
}

export type TTypeDiscovery = "music_campaign" | "event_campaign" | "other" | "";
