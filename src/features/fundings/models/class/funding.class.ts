import { BaseClass } from "@/share/models/class/base.class";

export class FundingClass extends BaseClass {
	type: string = "music_campaign";
	title: string = "";
	goal_amount: number = 0;
	raised_amount: number = 0;
	progress_pct: number = 0;
	status: string = "";
	end_date: string = "";
	creator_username: string = "";
}
