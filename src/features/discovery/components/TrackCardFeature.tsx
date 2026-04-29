import imgTrackThumbnailFallback from "@/assets/images/track-cover-fallback.png";
import { Button } from "@/share/components/ui/button";
import { TrackClass } from "../models/class/track.class";

type TrackCardFeatureProps = {
    track: TrackClass;
}

export function TrackCardFeature(props: TrackCardFeatureProps) {
    const { track } = props;
    const thumbnailSrc = track.thumbnailUrl || imgTrackThumbnailFallback.src;
    return (
        <article
            key={track.submissionId}
            className=" flex items-center border border-[#7EB8B1]/15 rounded-[12px] p-3 gap-[1rem]"
        >
            <img
                src={thumbnailSrc}
                alt={track.trackTitle}
                width={90}
                height={90}
                className="size-[64px] shrink-0 rounded-[12px] object-cover"
                onError={(e) => {
                    e.currentTarget.src = imgTrackThumbnailFallback.src;
                }}
            />

            <div className="min-w-0 flex-1">
                <p className="truncate text-[1rem] leading-[1.5rem] font-bold text-dark-primary">
                    {track.trackTitle}
                </p>
                <p className="truncate text-[12px] leading-[16px] text-[#47817A]">
                    By {track.artistName}
                </p>
            </div>

            <Button className="h-[30px] min-w-[98px] rounded-full bg-secondary-button text-[10px] leading-[15px] font-bold  text-white hover:bg-[#00ac93]">
                VIEW
                <br />
                TRACK
            </Button>
        </article>
    );
} 