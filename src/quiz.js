import Quiz from "./Quiz.svelte";

const q = new Quiz({
    target: document.body,
    props: {
        name: "world",
    },
});

export default q;