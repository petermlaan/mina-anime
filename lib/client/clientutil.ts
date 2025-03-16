import SuperJSON from "superjson";
import { Product } from "../interfaces";
import { saveCartSA } from "../server/actions";
import { DEBOUNCE_DB_DELAY } from "../constants";

// ----- Debouncing DB writes -----
// Should only be called from the client
let debounceDBTimeout = -1;
const abortctrl = new AbortController();

export function saveCart(animes: Product[]) {
    if (!window) {
        console.error("SHOULD NOT HAPPEN! SaveAnimesToDB called from server.")
        saveCartSA(animes);
        return;
    }

    if (debounceDBTimeout > -1) {
        window.clearTimeout(debounceDBTimeout);
        abortctrl.abort();
    }

    const onBeforeUnload = () => {
        navigator.sendBeacon("/api/save-animes", SuperJSON.stringify(animes));
    };
    window.addEventListener("beforeunload", onBeforeUnload, { signal: abortctrl.signal })

    debounceDBTimeout = window.setTimeout(() => {
        abortctrl.abort();
        debounceDBTimeout = -1;
        saveCartSA(animes);
    }, DEBOUNCE_DB_DELAY);
}
