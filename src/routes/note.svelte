<script>
    import Navbar from '../components/Navbar.svelte';
    import {onMount} from 'svelte';

    let link;
    let pageData = '';
    onMount(() => {
        let temp = window.location.search;
        let splitted = temp.split('=');
        link = splitted[1];
        console.log(link);
        fetchData();
    });

    function fetchData() {
        fetch(link)
            .then((response) => response.text())
            .then((data) => (value = data));
    }

    import 'bytemd/dist/index.css'
    import {Editor, Viewer} from 'bytemd'
    import gfm from '@bytemd/plugin-gfm'
    import pluginmathssr from '@bytemd/plugin-math-ssr'
    import frontmatter from '@bytemd/plugin-frontmatter'
    import 'bytemd/dist/index.css'

    let value;
    let plugins = [gfm(), frontmatter(), pluginmathssr()]
</script>
<Navbar/>
<div className="container">
    <div className="markdown-body">
        <Viewer {value} {plugins}/>
    </div>
</div>

<style>
    .container {
        width: 100vw;
    }
</style>
