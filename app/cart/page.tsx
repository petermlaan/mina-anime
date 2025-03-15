import React from "react";
import { Metadata } from "next";
import { CartProducts } from "@/app/cart/cartproducts";

export const metadata: Metadata = {
  title: "Acme Inc"
};

export default async function Page() {
  return (
    <main className="grid gap-4 ml-4">
      <CartProducts />
    </main>
  );
}
