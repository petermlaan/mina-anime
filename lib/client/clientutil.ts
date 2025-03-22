import SuperJSON from "superjson";
import { Product } from "../interfaces";
import { saveCartAction } from "../server/actions";
import { DEBOUNCE_DB_DELAY } from "../constants";

// Functions that should only be called from the client

// ----- Debouncing DB writes -----
let debounceDBTimeout = -1;
const abortctrl = new AbortController();

export function saveCart(products: Product[]) {
    if (!window) {
        console.error("SHOULD NOT HAPPEN! saveCart called from server.");
        saveCartAction(products);
        return;
    }

    if (debounceDBTimeout > -1) {
        window.clearTimeout(debounceDBTimeout);
        abortctrl.abort();
    }

    const onBeforeUnload = () => {
        console.count("onBeforeUnload");
        navigator.sendBeacon("/api/savecart", SuperJSON.stringify(products));
    };
    window.addEventListener("beforeunload", onBeforeUnload, { signal: abortctrl.signal });

    debounceDBTimeout = window.setTimeout(() => {
        abortctrl.abort();
        debounceDBTimeout = -1;
        saveCartAction(products);
    }, DEBOUNCE_DB_DELAY);
}
