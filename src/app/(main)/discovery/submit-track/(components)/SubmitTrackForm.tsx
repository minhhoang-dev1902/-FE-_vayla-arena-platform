import { useCallback } from "react";
import { z } from "zod";
import { Button } from "@/share/components/ui/button";
import { PreviewYoutubeEmbed } from "@/share/components/ui/customs/custom-cards/PreviewYoutubeEmbed";
import { CustomCheckBox } from "@/share/components/ui/customs/custom-checkbox/CustomCheckBox";
import { CustomInput } from "@/share/components/ui/customs/custom-input/CustomInput";
import { CustomTextArea } from "@/share/components/ui/customs/custom-input/CustomTextArea";
import { CustomSelect } from "@/share/components/ui/customs/custom-select/CustomSelect";
import { CustomForm, FormItem } from "@/share/forms";
import { Policy } from "./Policy";

const genreItems = [
	{ label: "Pop", value: "pop" },
	{ label: "Hip-Hop / Rap", value: "hiphop-rap" },
	{ label: "R&B / Soul", value: "randb-soul" },
	{ label: "Rock", value: "rock" },
	{ label: "Alternative", value: "alternative" },
	{ label: "Electronic", value: "electronic" },
	{ label: "Dance / EDM", value: "dance-edm" },
	{ label: "House", value: "house" },
	{ label: "Techno", value: "techno" },
	{ label: "Jazz", value: "jazz" },
	{ label: "Classical", value: "classical" },
	{ label: "Blues", value: "blues" },
	{ label: "Funk", value: "funk" },
	{ label: "Punk", value: "punk" },
	{ label: "Metal", value: "metal" },
	{ label: "Latin", value: "latin" },
	{ label: "Reggae", value: "reggae" },
	{ label: "Country", value: "country" },
	{ label: "Folk", value: "folk" },
	{ label: "Indie", value: "indie" },
	{ label: "K-Pop", value: "kpop" },
	{ label: "Lo-Fi", value: "lofi" },
	{ label: "Ambient", value: "ambient" },
	{ label: "Soundtrack / OST", value: "soundtrack-ost" },
];

const submitTrackSchema = z.object({
	trackTitle: z.string().min(1, "Track title is required").max(120, "Track title is too long"),
	artistName: z.string().min(1, "Artist name is required").max(120, "Artist name is too long"),
	genre: z.string().min(1, "Please select a genre"),
	youtubeUrl: z.string().min(1, "Please enter a YouTube URL"),
	challengeSelection: z.boolean(),
	description: z.string(),
});

type SubmitTrackFormValues = z.infer<typeof submitTrackSchema>;

const DEFAULT_VALUES: SubmitTrackFormValues = {
	trackTitle: "",
	artistName: "",
	genre: "",
	challengeSelection: false,
	youtubeUrl: "",
	description: "",
};

export function SubmitTrackForm() {
	const handleSubmit = useCallback((values: SubmitTrackFormValues) => {
		// TODO: gọi API submit track
		void values;
	}, []);

	return (
		<CustomForm<SubmitTrackFormValues>
			onSubmit={handleSubmit}
			schema={submitTrackSchema}
			defaultValues={DEFAULT_VALUES}
			className=" mt-6 flex flex-col gap-[18px]"
		>
			{form => (
				<>
					<FormItem<SubmitTrackFormValues> label="Track" name="trackTitle">
						<CustomInput placeholder="Enter your track title" />
					</FormItem>

					<FormItem<SubmitTrackFormValues> name="artistName" label="Artist Name">
						<CustomInput placeholder="Artist or band name" />
					</FormItem>

					<FormItem<SubmitTrackFormValues> name="genre" label="Genre">
						<CustomSelect items={genreItems} placeholder="Choose genre" />
					</FormItem>

					<FormItem<SubmitTrackFormValues> name="challengeSelection" label="Challenge Selection">
						<CustomCheckBox title="Upload your track file" />
					</FormItem>

					<FormItem<SubmitTrackFormValues> name="youtubeUrl" label="YouTube Embed Link">
						<CustomInput placeholder="Enter your YouTube embed link" />
					</FormItem>

					<PreviewYoutubeEmbed url={form.watch("youtubeUrl")} className="mb-[20px] mt-[-5 px]" />

					<FormItem<SubmitTrackFormValues> name="description" label="Short Description">
						<CustomTextArea placeholder="Add a short description of the track and its mood" />
					</FormItem>

					<p className="text-[11px] text-[#666666] leading-[18px] tracking-[0.28px] mt-[-30px]">
						<span className="text-[#D97706] uppercase">Note:</span> AI-generated music is allowed —
						disclose if primarily AI-assisted.
					</p>

					<Policy />

					<Button
						type="submit"
						className="mt-[8px] h-[58px] w-full rounded-[10px] bg-primary text-[15px] font-semibold text-primary-foreground"
					>
						Submit Track
					</Button>

					<p className="text-[11px] text-cus-title-form leading-[16.5px] tracking-[0.55px] mt-[-10px] uppercase mx-auto">
						Tracks are published only after admin approval
					</p>
				</>
			)}
		</CustomForm>
	);
}
