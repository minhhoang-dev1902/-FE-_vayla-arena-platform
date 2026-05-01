import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Controller } from "react-hook-form";
import { useGetEvents } from "@/features/discovery/hooks/getEvents";
import { useMutateSubmitTrack } from "@/features/discovery/hooks/useMutateSubmitTrack";
import {
	EEventSearchType,
	EventSearchClass,
} from "@/features/discovery/models/class/event-search.class";
import type { SubmitTrackResponseClass } from "@/features/discovery/models/class/track.class";
import {
	DEFAULT_VALUES_FORM,
	type SubmitTrackFormValues,
	submitTrackSchema,
} from "@/features/discovery/models/schema/submit-track.schema";
import type { SubmitTrackErrorData } from "@/features/discovery/utils/submit-track-result";
import { Button } from "@/share/components/ui/button";
import { PreviewYoutubeEmbed } from "@/share/components/ui/customs/custom-cards/PreviewYoutubeEmbed";
import { CustomCheckBox } from "@/share/components/ui/customs/custom-checkbox/CustomCheckBox";
import { CustomInput } from "@/share/components/ui/customs/custom-input/CustomInput";
import { CustomTextArea } from "@/share/components/ui/customs/custom-input/CustomTextArea";
import { CustomSelect } from "@/share/components/ui/customs/custom-select/CustomSelect";
import { Field, FieldError, FieldLabel } from "@/share/components/ui/field";
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

interface SubmitTrackFormProps {
	onPending?: () => void;
	onSuccess: (result: SubmitTrackResponseClass) => void;
	onError: (error: SubmitTrackErrorData) => void;
}

export function SubmitTrackForm({ onPending, onSuccess, onError }: SubmitTrackFormProps) {
	const searchParams = useSearchParams();
	const eventId = searchParams.get("eventId");

	const initEventSearch = new EventSearchClass({
		typeEvent: EEventSearchType.LIVE,
	});
	const { data: resDataEvent } = useGetEvents(initEventSearch);
	const eventList = resDataEvent?.data?.events ?? [];

	const { mutate: mutateSubmitTrack, isPending } = useMutateSubmitTrack({
		onSuccess: result => {
			onSuccess(result);
		},
		onError: error => {
			const axiosError = error as {
				response?: { data?: { error?: { code?: string; message?: string } }; status?: number };
			};
			onError({
				code: axiosError.response?.data?.error?.code ?? "UNKNOWN_ERROR",
				message: axiosError.response?.data?.error?.message ?? "An unexpected error occurred.",
				httpStatus: axiosError.response?.status,
			});
		},
	});

	const handleSubmit = useCallback(
		async (values: SubmitTrackFormValues) => {
			onPending?.();
			mutateSubmitTrack(values);
		},
		[mutateSubmitTrack, onPending],
	);

	return (
		<CustomForm<SubmitTrackFormValues>
			onSubmit={handleSubmit}
			schema={submitTrackSchema}
			defaultValues={eventId ? { ...DEFAULT_VALUES_FORM, eventId } : DEFAULT_VALUES_FORM}
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

					<Controller<SubmitTrackFormValues>
						control={form.control}
						name="eventId"
						render={({ field, fieldState }) => (
							<Field className="relative mb-6" data-invalid={fieldState.invalid || undefined}>
								<FieldLabel className="text-[13px] leading-[15px] font-semibold tracking-[0.8px] text-dark-primary uppercase">
									Challenge Selection
								</FieldLabel>
								{eventList.length === 0 ? (
									<p className="mt-2 text-[12px] leading-[18px] text-[#666666]">
										No live challenges available right now.
									</p>
								) : (
									<div className="mt-2 min-w-0 max-w-full overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] pb-1">
										<div className="flex w-max min-w-0 flex-nowrap gap-[10px]">
											{eventList.map(event => (
												<CustomCheckBox
													key={event.id}
													title={event.name}
													checked={field.value === event.id}
													onCheckedChange={checked => {
														if (checked) {
															field.onChange(event.id);
														} else if (field.value === event.id) {
															field.onChange("");
														}
													}}
												/>
											))}
										</div>
									</div>
								)}
								{fieldState.error ? (
									<FieldError
										errors={[{ message: fieldState.error.message }]}
										className="absolute left-0 top-full mt-[4px] text-[12px] leading-[14px] animate-in fade-in slide-in-from-top-1 duration-200"
									/>
								) : null}
							</Field>
						)}
					/>

					<FormItem<SubmitTrackFormValues> name="youtubeUrl" label="YouTube Embed Link">
						<CustomInput placeholder="Enter your YouTube embed link" />
					</FormItem>

					<PreviewYoutubeEmbed url={form.watch("youtubeUrl")} className="mb-[20px] mt-[-5px]" />

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
						disabled={isPending}
						className="mt-[8px] h-[58px] w-full rounded-[10px] bg-primary text-[15px] font-semibold text-primary-foreground"
					>
						{isPending ? "Submitting..." : "Submit Track"}
					</Button>

					<p className="text-[11px] text-cus-title-form leading-[16.5px] tracking-[0.55px] mt-[-10px] uppercase mx-auto">
						Tracks are published only after admin approval
					</p>
				</>
			)}
		</CustomForm>
	);
}
