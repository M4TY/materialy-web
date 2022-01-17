import Presetations from "./Presentations.svelte";

const p = new Presetations({
    target: document.body,
    props: {
        name: "world",
    },
});

export default p;