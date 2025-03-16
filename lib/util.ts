
export function convertSPToString(sp: string | string[] | undefined): string {
    return Array.isArray(sp) ? sp[0] ?? "" : sp ?? "";
}

export function toPascalCase(str: string) {
    // Replace underscores with spaces, then capitalize first letter of each word
    let s = str.replace(/_/g, " ");
    s = s.replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase());
    return s;
}
