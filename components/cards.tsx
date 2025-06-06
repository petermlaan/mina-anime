"use client"
import Image from "next/image"
import React from "react"
import { Genres } from "./genres"
import { MyAnime } from "@/lib/interfaces"
import { useAnimeContext } from "./animecontext"
import LinkNP from "./linknp"

interface CardsProps {
    animes: MyAnime[];
    search?: boolean;
}

export function Cards({ animes, search = false }: CardsProps) {
    const ac = useAnimeContext()

    return (
        <section className="grid grid-cols-[repeat(auto-fit,260px)] justify-center gap-4">
            {animes.map((a, i) => !(ac.hideWatched && a.watched) &&
                <Card key={i} anime={a} search={search} />
            )}
        </section>
    )
}

interface CardProps {
    anime: MyAnime;
    search: boolean;
}

export function Card({ anime, search }: CardProps) {
    const ac = useAnimeContext()

    return (
        <article className="grid grid-rows-[subgrid] row-span-4 gap-2 bg-[--clr-main1] border border-[--clr-main3] rounded-2xl p-2 hover:outline hover:outline-[--clr-main3]">
            <div className="flex justify-between">
                <button
                    onClick={() => anime.saved ?
                        ac.removeAnime(anime.mal_id) :
                        ac.addAnime(anime)}
                    className={(search && anime.saved) ? "disabled btn" : "btn"}
                    disabled={search && anime.saved}>
                    {search ? "Spara" : "Ta bort"}
                </button>
                <div>Poäng: {anime.score.toFixed(1)}</div>
                <div>
                    {!search && (
                        <label className="checkbox">Sedd
                            <input type='checkbox'
                                checked={anime.watched}
                                onChange={() => ac.updateAnime(anime.mal_id, { watched: !anime.watched })} />
                        </label>
                    )}
                </div>
            </div>
            <div className="text-2xl text-balance">
                <LinkNP href={"anime/" + anime.mal_id}>
                    <span>{anime.title_english}</span>
                </LinkNP>
            </div>
            <LinkNP href={"anime/" + anime.mal_id}>
                <Image
                    src={anime.poster}
                    width={240} height={360}
                    className="w-[240px] h-[360px] object-cover"
                    alt={"Poster för " + anime.title_english} />
            </LinkNP>
            <Genres genres={anime.genres} />
        </article>
    )
}
