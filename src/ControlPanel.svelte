<script>
    import { timing, colors } from './store.js'
    import { onMount } from 'svelte'


    function generateRandomColor() {
        return Math.random().toString(16).substr(2,6)
    }

    function addMoreColor() {
        colors.update(oldColors => [...oldColors, "#" + generateRandomColor()])
    }

    function removeLastColor() {
        colors.update(oldColors => oldColors.slice(0,-1))
    }

</script>

<div class="control-panel">
    <p>Change color every <input class="seconds" type="number" bind:value={$timing}> seconds</p>

    <div class="colors">
        {#each $colors as color}
            <input type="color" bind:value={color}>
            <input type="text" bind:value={color}>
        {/each}
    </div>

    <button on:click={ addMoreColor }>Add more color</button>
    <button on:click={ removeLastColor }>Remove last color</button>
    
    <p>Click anywhere outside this panel to close it. Open this panel again by hovering and clicking the bottom-left corner of the screen.</p>

</div>

<style>
    .control-panel {
        color:  #eee;
        background-color:  #000;
        width: 50%;
        margin: 50px auto 0 auto;
        padding: 0.5em 1em;

        text-align:  center;
    }

    input {
        width: 10em;
        height: 2em;
    }

    input.seconds {
        height:  1.5em;
        width: 4em;
    }

    .colors {
        display:  grid;
        grid-template-columns:  1fr 1fr;
        grid-gap: 2em;
        width:  80%;
        margin: 1em auto;
    }

    .colors > * {
        width:  100%;
    }
</style>