"use client";
import { TrackCardFeature } from "../TrackCardFeature";
import { TrackClass } from "../../models/class/track.class";
import { RevealMotion } from "@/share/components/ui/customs/custom-motion/RevealMotion";
import { CustomScrollView } from "@/share/components/ui/customs/ScrollView";
import { Button } from "@/share/components/ui/button";
import { useRouter } from "next/navigation";
import { NAVIGATE } from "@/share/contants/navigate";

interface ITrackListFeatureProps {
    tracks: TrackClass[];
}
export function TrackListFeature(props: ITrackListFeatureProps) {
    // const { tracks } = props;
    const router = useRouter();
    const tracks = [
        {
            "id": "7e95d2b3-c708-407b-b925-3907bb53e711",
            "submissionId": "SUB-260404-5509",
            "userId": "ba770f85-f732-4246-aaf2-12e9b173fd1e",
            "eventId": "f379f7ad-a9ad-43d1-91d4-bda8aa684aa4",
            "trackTitle": "Supernova",
            "artistName": "aespa",
            "genre": "K-Pop",
            "youtubeUrl": "https://www.youtube.com/watch?v=GCZCqoqJfwU",
            "description": "aespa comeback 2024 - Supernova, bài hit đứng đầu charts toàn cầu",
            "aiLabel": null,
            "status": "approved",
            "voteCount": 28,
            "createdAt": "2026-04-04T13:48:56.455Z"
        },
        {
            "id": "d69f5030-e0c0-4cb5-9ee2-f7df1f956f4e",
            "submissionId": "SUB-260404-9201",
            "userId": "e38a9cbb-a31d-4158-ade9-00b27d0b33a7",
            "eventId": "f379f7ad-a9ad-43d1-91d4-bda8aa684aa4",
            "trackTitle": "Hype Boy",
            "artistName": "NewJeans",
            "genre": "K-Pop",
            "youtubeUrl": "https://www.youtube.com/watch?v=ArmDp-zijuc",
            "description": "NewJeans debut mega-hit 2022 — Hype Boy, đỉnh cao của làn sóng 4th gen K-pop",
            "aiLabel": null,
            "status": "approved",
            "voteCount": 2,
            "createdAt": "2026-04-04T13:51:19.106Z"
        },
        {
            "id": "15bad498-0163-4ce0-b9cf-b3057d231d94",
            "submissionId": "SUB-260404-9059",
            "userId": "63f0f361-ed3a-4729-8680-20f9a525d46f",
            "eventId": "f379f7ad-a9ad-43d1-91d4-bda8aa684aa4",
            "trackTitle": "TOMBOY",
            "artistName": "(G)I-DLE",
            "genre": "K-Pop",
            "youtubeUrl": "https://www.youtube.com/watch?v=YPqJG4fzbnI",
            "description": "GIDLE - TOMBOY bản hit 2022 phá đảo các bảng xếp hạng",
            "aiLabel": null,
            "status": "approved",
            "voteCount": 0,
            "createdAt": "2026-04-04T13:48:56.708Z"
        },
        {
            "id": "d99b681d-4587-440c-b916-a8ef8d0a2838",
            "submissionId": "SUB-260404-8127",
            "userId": "2ca50ee3-1445-4a2c-926e-a2ba622f427d",
            "eventId": "f379f7ad-a9ad-43d1-91d4-bda8aa684aa4",
            "trackTitle": "Love wins all",
            "artistName": "IU",
            "genre": "K-Pop",
            "youtubeUrl": "https://www.youtube.com/watch?v=p39J0TFzMVE",
            "description": "IU - Love wins all, MV lay động triệu con tim đầu năm 2024",
            "aiLabel": null,
            "status": "approved",
            "voteCount": 0,
            "createdAt": "2026-04-04T13:51:19.156Z"
        },
        {
            "id": "331ba28e-37ef-4f7a-b31c-46635af1ac1f",
            "submissionId": "SUB-260404-5176",
            "userId": "20df8fc5-c4f8-499b-b783-8789cea4c4ee",
            "eventId": "f379f7ad-a9ad-43d1-91d4-bda8aa684aa4",
            "trackTitle": "Pink Venom",
            "artistName": "BLACKPINK",
            "genre": "K-Pop",
            "youtubeUrl": "https://www.youtube.com/watch?v=tyS3lEa-iGU",
            "description": "BLACKPINK - Pink Venom pre-release 2022, bold & powerful comeback",
            "aiLabel": null,
            "status": "approved",
            "voteCount": 0,
            "createdAt": "2026-04-04T13:51:19.196Z"
        },
        {
            "id": "2f837454-c6f4-469c-95e9-43b3bb217edf",
            "submissionId": "SUB-260404-7372",
            "userId": "a4771004-5430-409e-adf1-6c89ee77da5b",
            "eventId": "f379f7ad-a9ad-43d1-91d4-bda8aa684aa4",
            "trackTitle": "Feel Special",
            "artistName": "TWICE",
            "genre": "K-Pop",
            "youtubeUrl": "https://www.youtube.com/watch?v=VDHkDIp1s3E",
            "description": "TWICE - Feel Special, giai điệu ngọt ngào và đầy cảm xúc 2019",
            "aiLabel": null,
            "status": "approved",
            "voteCount": 0,
            "createdAt": "2026-04-04T13:51:19.235Z"
        },
        {
            "id": "e862b5cc-9f77-49b8-ae01-a0f051626c3d",
            "submissionId": "SUB-260404-8950",
            "userId": "353eab1b-c608-4053-9b83-5e4d1f9ffad1",
            "eventId": "f379f7ad-a9ad-43d1-91d4-bda8aa684aa4",
            "trackTitle": "Spicy",
            "artistName": "aespa",
            "genre": "K-Pop",
            "youtubeUrl": "https://www.youtube.com/watch?v=Z2mhQnN1YSQ",
            "description": "aespa - Spicy 2023, giai điệu bắt tai và vũ đạo ấn tượng",
            "aiLabel": null,
            "status": "approved",
            "voteCount": 0,
            "createdAt": "2026-04-04T13:51:19.467Z"
        },
        {
            "id": "d8d2c92c-1d1c-44da-814b-b99d156f179b",
            "submissionId": "SUB-260404-8574",
            "userId": "a999ae06-6036-4183-8ee6-359077b7f53b",
            "eventId": "f379f7ad-a9ad-43d1-91d4-bda8aa684aa4",
            "trackTitle": "OMG",
            "artistName": "NewJeans",
            "genre": "K-Pop",
            "youtubeUrl": "https://www.youtube.com/watch?v=vgxcHgRqDiY",
            "description": "NewJeans - OMG 2023, Y2K aesthetic với âm nhạc vượt thời đại",
            "aiLabel": null,
            "status": "approved",
            "voteCount": 0,
            "createdAt": "2026-04-04T13:51:19.515Z"
        },
        {
            "id": "9eb0a13a-d1a8-4953-a56f-01150ecce90b",
            "submissionId": "SUB-040426-8314",
            "userId": "224e6dca-f215-423d-ae84-e58091d8aa6d",
            "eventId": "f379f7ad-a9ad-43d1-91d4-bda8aa684aa4",
            "trackTitle": "ETA",
            "artistName": "NewJeans",
            "genre": "K-Pop",
            "youtubeUrl": "https://www.youtube.com/watch?v=p8pSfvKBVAU",
            "description": "NewJeans - ETA từ album Get Up 2023, Y2K vibes cực chất",
            "aiLabel": null,
            "status": "approved",
            "voteCount": 0,
            "createdAt": "2026-04-04T13:51:52.425Z"
        }
    ]
    return (
        <div>
            <div className="flex items-center justify-between mt-[40px] mb-[24px]">
                <p className="text-[20px] leading-[28;px] font-bold text-dark-primary">Featured Tracks</p>
                <p className="text-[14px] leading-[20px] text-secondary-button leading-[20px]">Trending</p>
            </div>
            <RevealMotion triggerKey={tracks?.length}>
                <CustomScrollView className="flex flex-col gap-4">
                    {
                        tracks?.length > 0 && tracks.map((track) => (
                            <TrackCardFeature key={track.submissionId} track={track} />
                        ))
                    }
                </CustomScrollView>
            </RevealMotion>

            <Button
                variant="ghost"
                className="mt-6 h-[68px] w-full rounded-full bg-linear-to-b from-[#006857] to-[#005B4C] text-180px] leading-[28px] font-semibold text-white shadow-[0_12px_24px_0_rgba(0,104,87,0.3)] hover:from-[#006857] hover:to-[#005B4C] hover:text-white"
                onClick={() => router.push(NAVIGATE.SUBMIT_TRACK)}
            >
                Join Challenge
            </Button>
        </div>
    );
} 