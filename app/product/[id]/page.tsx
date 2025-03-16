import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getProduct } from "@/lib/productapi";
import Amount from "@/components/amount";
import BackBtn from "@/components/backbtn";

export async function generateMetadata({ params }: {params: Promise<{id: number}> }): Promise<Metadata> {
  const id = (await params).id;
  const product = await getProduct(id);
  return { title: product.title + " - Acme Inc"};
}

export default async function AnimePage( { params }: {params: Promise<{id: number}> } ) {
  const id = (await params).id;
  const product = await getProduct(id);

  return (
    <main className="flex flex-col gap-4 bg-(--clr-main1) border border-(--clr-main3) m-4 p-2 md:flex-row">

      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[5rem_5rem] gap-12 h-8 items-center">
          <BackBtn />
          <Amount product={product} />
        </div>
        <Link href={product.images[0]}>
          <Image
            className="w-60 h-90 object-cover"
            width={240} height={360}
            src={product.images[0]}
            alt={`Bild på ${product.title}`}
            priority />
        </Link>
      </div>

      <div className="flex flex-col gap-2 pr-4">
        <h2 className="text-xl">{product.title}</h2>
        <p>{product.description}</p>
      </div>

    </main>
  );
}
