import { Product, APISearchResult } from "./interfaces";

export async function getProduct(id: number): Promise<Product> {
    const a = await fetchJSON("https://dummyjson.com/products/" + id, true) as Product;
    a.amount = 0;
    return a;
}

export async function getProductsByCategory(category: string): Promise<APISearchResult> {
    const json = await fetchJSON("https://dummyjson.com/products/category/" + category) as APISearchResult;
    json.products.forEach(p => p.amount = 0);
    return json;
}

export async function searchProducts(query: string, page: number = 1): Promise<APISearchResult> {
    const json = await fetchJSON("https://dummyjson.com/products/search?q=" + query + "&skip=" + (page - 1) * 30) as APISearchResult;
    json.products.forEach(p => p.amount = 0);
    return json;
}

export async function getCategoryList(): Promise<string[]> {
    const json = await fetchJSON("https://dummyjson.com/products/category-list", true) as string[];
    return json;
}

async function fetchJSON(url: string, cache: boolean = false) {
    console.log("fetchJSON: ", url, cache);
    const res = await fetch(url, { next: { revalidate: cache ? 3600 : 0 } });
    return await res.json();
}
