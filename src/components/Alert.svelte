<script>
    export let title;
    export let content;
    export let display = "none";
</script>

<div class="wrapper">
    <div class="content" style="display: {display}">
        <p>{content}</p>
    </div>
</div>

<style>
    .content {
        position: fixed;
        z-index: 200;
        top: 20px;
        right: 40%;
        background-color: #334756;
        border: 2px solid white;
        border-radius: 10px;
        width: 20%;
        justify-content: center;
        align-items: center;
        animation: dropDown 0.5s ease;
    }

    @keyframes dropDown {
        from {
            transform: translateY(-300px);
        }
        to {
            transform: translateY(0px);
        }
    }

    .content p {
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>