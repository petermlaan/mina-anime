"use client";

import Image from "next/image";
import React from "react";
import { useProductContext } from "./animecontext";
import LinkNP from "./linknp";
import { Product } from "@/lib/interfaces";

interface CardsProps {
    products: Product[];
    search?: boolean;
}

export function Cards({ products, search = false }: CardsProps) {
    return (
        <section className="grid grid-cols-[repeat(auto-fit,260px)] justify-center gap-4">
            {products.map((a, i) => 
                <Card key={i} product={a} search={search} />
            )}
        </section>
    );
}

interface CardProps {
    product: Product;
    search: boolean;
}

export function Card({ product, search }: CardProps) {
    const ac = useProductContext();

    return (
        <article className="grid grid-rows-[subgrid] row-span-4 gap-2 bg-[--clr-main1] border border-[--clr-main3] rounded-2xl p-2 hover:outline hover:outline-[--clr-main3]">
            <div className="flex justify-between">
                <button
                    onClick={() => product.saved ?
                        ac.removeProduct(product.id) :
                        ac.addProduct(product)}
                    className={(search && product.saved) ? "disabled btn" : "btn"}
                    disabled={search && product.saved}>
                    {search ? "Spara" : "Ta bort"}
                </button>
            </div>
            <div className="text-2xl text-balance">
                <LinkNP href={"anime/" + product.id}>
                    <span>{product.title}</span>
                </LinkNP>
            </div>
            <LinkNP href={"anime/" + product.id}>
                <Image
                    src={product.images[0] ?? "/favicon.jpg"}
                    width={240} height={360}
                    className="w-[240px] h-[360px] object-cover"
                    alt={"Poster för " + product.title} />
            </LinkNP>
        </article>
    );
}
