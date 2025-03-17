import React from "react";
import Image from "next/image";
import Amount from "./amount";
import LinkNP from "./linknp";
import { Product } from "@/lib/interfaces";

interface CardsProps {
    products: Product[];
}

export function Cards({ products }: CardsProps) {
    return (
        <section className="grid grid-cols-[repeat(auto-fit,260px)] justify-center gap-4">
            {products.map((a, i) =>
                <Card key={i} product={a} />
            )}
        </section>
    );
}

interface CardProps {
    product: Product;
}

export function Card({ product }: CardProps) {
    return (
        <article className="grid grid-rows-[subgrid] row-span-4 gap-2 bg-[--clr-main1] border 
            border-[--clr-main3] rounded-2xl p-2 hover:outline hover:outline-[--clr-main3]">
            <div className="text-2xl text-balance">
                <LinkNP href={"product/" + product.id}>
                    <span>{product.title}</span>
                </LinkNP>
            </div>
            <LinkNP href={"product/" + product.id}>
                <Image
                    src={product.images[0] ?? "/favicon.jpg"}
                    width={240} height={360}
                    className="w-[240px] h-[360px] object-cover"
                    alt={"Poster för " + product.title} />
            </LinkNP>
            <div>Pris: {product.price} kr</div>
            <div className="justify-self-center"><Amount product={product} /></div>
        </article>
    );
}
