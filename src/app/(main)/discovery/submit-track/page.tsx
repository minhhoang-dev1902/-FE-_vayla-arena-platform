"use client";

import { HeaderWithBackBtn } from "@/share/components/layout/headers/HeadeWithBackBtn";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { PageTransitionMotion } from "@/share/components/ui/customs/custom-motion/PageTransitionMotion";
import { CustomInputGroup } from "@/share/components/ui/customs/custom-input/CustomInputGroup";
import { CustomSelectGroup } from "@/share/components/ui/customs/custom-select/CustomSelectGroup";


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
    { label: "Soundtrack / OST", value: "soundtrack-ost" }
];


export default function SubmitTrackPage() {
    const router = useRouter();
    const handleBtnBackClick = useCallback(() => {
        router.back();
    }, [router]);
    return (
        <PageTransitionMotion>
            <HeaderWithBackBtn title="Submit Track" description="Submit your track to the challenge" onBtnBackClick={handleBtnBackClick} />
            <div className="container mt-[1.5rem]">
                <CustomInputGroup label="Track" placeholder="Enter your track title" />

                <CustomInputGroup label="Artist Name" placeholder="Artist or band name" />

                <CustomSelectGroup label="Genre" items={genreItems} />

            </div>
        </PageTransitionMotion>
    );
}