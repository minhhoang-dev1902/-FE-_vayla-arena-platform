import z from "zod";

export const submitTrackSchema = z.object({
	trackTitle: z.string().min(1, "Track title is required").max(120, "Track title is too long"),
	artistName: z.string().min(1, "Artist name is required").max(120, "Artist name is too long"),
	genre: z.string().min(1, "Please select a genre"),
	youtubeUrl: z.string().min(1, "Please enter a YouTube URL"),
	eventId: z.string(),
	description: z.string(),
});

export type SubmitTrackFormValues = z.infer<typeof submitTrackSchema>;

export const DEFAULT_VALUES_FORM: SubmitTrackFormValues = {
	trackTitle: "",
	artistName: "",
	genre: "",
	eventId: "",
	youtubeUrl: "",
	description: "",
};
