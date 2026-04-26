export interface IDiscovery {
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
}

export type TTypeDiscovery = "music_campaign" | "event_campaign" | "other";
export type TStatusDiscovery = "--" | "draft" | "active" | "funded" | "failed" | "cancelled";
