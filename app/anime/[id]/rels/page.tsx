"use client"
import { use, useEffect, useState } from "react"
import { JikanRelation } from "@tutkli/jikan-ts"
import { getAnimeRelations } from "@/lib/client/clientutil"
import { toPascalCase } from "@/lib/util"
import LinkNP from "@/components/linknp"

export default function RelsPage({ params }: { params: Promise<{ id: number }> }) {
    const id = +use(params).id
    const [rels, setRels] = useState<JikanRelation[] | null>(null)
    const [error, setError] = useState<unknown>(null)

    useEffect(() => {
        setError(null)
        getAnimeRelations(id).then(res => {
            setRels(res.data)
            document.title = id + " - Mina Anime"
        }).catch((err) => setError(err))
    }, [id])

    if (error)
        throw error

    if (!rels) {
        return <div>Laddar rekommendationer...</div>
    }

    return (
        <main className="grid gap-4 m-4">
            <h1 className="text-4xl">Relations</h1>
            {rels.map(({ relation, entry }, i) =>
                <div key={i}>
                    <span className="text-xl font-bold">{relation}</span>
                    {entry.map((r, i) =>
                        <article key={i}>
                            <span>{toPascalCase(r.type)}: </span>
                            <LinkNP href={"/anime/" + r.mal_id}>{r.name}</LinkNP>
                        </article>
                    )}
                </div>
            )}
        </main>
    );
}
