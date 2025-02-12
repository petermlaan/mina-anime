export async function fetchJSON(url: string) {
    console.log("Fetching: " + url);
    const response = await fetch(url);
    if (!response.ok)
        throw new Error(response.status.toString());
    const data = await response.json();
    console.log(data);
    return data;
}