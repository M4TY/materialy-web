import Pres from "./Pres.svelte";

const p = new Pres({
    target: document.body,
    props: {
        name: "world",
    },
});

export default p;