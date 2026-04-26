export interface IFunding {
	id: string;
	slug: string;
	type: TFundingType;
	title: string;
	status: TFundingStatus;
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
export type TFundingStatus =
	| "completed"
	| "pending_audit"
	| "draft"
	| "active"
	| "funded"
	| "failed"
	| "cancelled";
export type TFundingType = "music_campaign" | "art_campaign" | "event_campaign" | "other";
