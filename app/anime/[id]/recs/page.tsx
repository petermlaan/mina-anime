"use client"
import { use, useEffect, useState } from "react"
import Image from "next/image"
import { Recommendation } from "@tutkli/jikan-ts"
import { getAnimeRecommendations } from "@/lib/client/clientutil"
import LinkNP from "@/components/linknp"

export default function RecsPage({ params }: { params: Promise<{ id: number }> }) {
    const id = +use(params).id

    const [recs, setRecs] = useState<Recommendation[] | null>(null)
    const [error, setError] = useState<unknown>(null)

    useEffect(() => {
        setError(null)
        getAnimeRecommendations(id).then(res => {
            setRecs(res.data)
            document.title = id + " - Mina Anime"
        }).catch((err) => setError(err))
    }, [id])

    if (error)
        throw error

    if (!recs) {
        return <div>Laddar rekommendationer...</div>
    }

    return (
        <main className="grid grid-cols-[repeat(auto-fit,260px)] justify-center gap-4">
            {recs.slice(0, 12).map(( { entry }, i ) => 
                <article key={i} className="grid grid-rows-[subgrid] row-span-2 gap-2 bg-[--clr-main1] border border-[--clr-main3] rounded-2xl p-2 hover:outline hover:outline-[--clr-main3]">
                    <LinkNP href={"/anime/" + entry.mal_id}><span>{entry.title}</span></LinkNP>
                    <Image
                        src={entry.images.jpg.large_image_url || "/favicon.jpg"}
                        width={240} height={360}
                        className="w-[240px] h-[360px] object-cover"
                        alt={"Poster för " + entry.title} />
                </article>
            )}
        </main>
    )
}
