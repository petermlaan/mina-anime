export function toPascalCase(str: string) {
    // Replace underscores with spaces, then capitalize first letter of each word
    let s = str.replace(/_/g, " ");
    s = s.replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase());
    return s;
}

export async function fetchJSON(url: string, cache: boolean = false) {
    console.log("fetchJSON: ", url, cache);
    const res = await fetch(url, { next: { revalidate: cache ? 3600 : 0 } });
    const json = await res.json();
    return json;
}