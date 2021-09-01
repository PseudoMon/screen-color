<script>
    import { colors, timing } from './store.js'
    import { onMount } from 'svelte'
    import Overlay from './Overlay.svelte'

    let currentColor = ""
    let currentColorI = 0 //index of the currently visible color
    let timer = 0
    let overlayVisible = true

    function generateRandomColor() {
        return Math.random().toString(16).substr(2,6)
        // return a color hexcode
    }

    function addMoreColor() {
        colors.update(oldColors => [...oldColors, "#" + generateRandomColor()])
    }

    function setBackground(color) {
        document.body.style.setProperty("--current-color", color)
    }

    function closeOverlay() {
        overlayVisible = false
    }

    function openOverlay() {
        overlayVisible = true
    }

    onMount(() => {
        addMoreColor() // add initial random color
        currentColor = $colors[0]

        const interval = setInterval(() => {
            timer += 1
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    })

    $: currentColor = $colors[currentColorI]

    $: setBackground(currentColor)

    $: {
        if (timer >= $timing) {
            if (currentColorI + 1 >= $colors.length) {
                currentColorI = 0
            }
            else {
                currentColorI += 1
            }

            timer = 0
        }
    }

    $: console.log(timer)

</script>

{#if overlayVisible}
<Overlay on:closeOverlay={ closeOverlay }/>
{/if}

<div class="bottom">
    <button on:click={openOverlay} class="panel-opener">Open control panel</button>
</div>

<style>
    :global(body) {
        --current-color: #9c2121;
        background-color: var(--current-color);
    }

    .bottom {
        opacity: 0;
        position: absolute;
        bottom:  0;
        width: 80%;
    }

    .bottom:hover {
        opacity: 1;
    }
</style>