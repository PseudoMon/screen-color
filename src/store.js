import { writable } from 'svelte/store'

export const state = writable({ 
    timing: 5,
    colors: []
})

export const timing = writable(5)

export const colors = writable([])