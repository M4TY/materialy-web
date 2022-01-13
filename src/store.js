import { writable } from "svelte/store";

let storedPage = localStorage.getItem("page");

if (!storedPage) {
    storedPage = "";
}

export const page = writable(storedPage);

page.subscribe((value) => {
    localStorage.setItem("page", value);
});
