import Note from "./Note.svelte";

const nt = new Note({
    target: document.body,
    props: {
        name: "world",
    },
});

export default nt;
