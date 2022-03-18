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
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap');
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
        animation: dropDown 5s ease;
    }

    @keyframes dropDown {
        0% {
            transform: translateY(-300px);
        }
        15% {
            transform: translateY(0px);
        }

        50% {
            transform: translateY(0px);
        }
        100% {
            transform: translateY(-300px);
        }
    }

    .content p {
        font-family: 'Montserrat', sans-serif;
        color: white;
        margin-top: 20px;
        margin-bottom: 20px;
        width: 80%;
        font-size: 17px;
        text-align: center;
    }

    @media screen and (min-width: 320px) and (max-width: 800px) {
        .content {
            width: 80%;
            right: 10%;
        }

        .content p {
            font-size: 12px;
            text-align: center;
        }
    }
</style>