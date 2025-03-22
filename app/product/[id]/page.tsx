import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getProduct } from "@/lib/productapi";
import Amount from "@/components/amount";
import BackBtn from "@/components/backbtn";

export async function generateMetadata({ params }: { params: Promise<{ id: number }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  return { title: product.title + " - Acme Inc" };
}

export default async function ProductPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <main className="flex flex-col gap-4 bg-(--clr-main1) border border-(--clr-main3) m-4 p-2 md:flex-row">

      <div className="flex flex-col gap-2">
        <div className="h-8">
          <BackBtn />
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
        <h3 className="text-lg">{product.brand}</h3>
        <p>{product.description}</p>
        <div>{product.price} kr</div>
        <div><Amount product={product} /></div>
        <div className="bg-(--clr-main0)">
          {product.reviews.map((r, i) => <div key={i}>
            <p>{r.comment}</p>
            <span className="ml-8 text-sm">- {r.reviewerName}</span>
          </div>)}
        </div>
      </div>

    </main>
  );
}
