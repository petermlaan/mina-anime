export async function fetchJSON(url: string) {
    const response = await fetch(url);
    if (!response.ok)
        throw new Error(response.status.toString());
    const data = await response.json();
    return data;
}