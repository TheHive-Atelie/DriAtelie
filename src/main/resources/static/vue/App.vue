<template>
    <div id="app" class="app-layout">
        <AppNavbar />

        <div class="main-area">
            <AppHeader />
            <main style="padding:1rem">
                <p>Selecione uma opção na barra lateral.</p>
            </main>
        </div>
    </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppNavbar from './components/AppNavbar.vue'
</script>

<style>
.app-layout { display:flex; min-height:100vh }
.main-area { flex:1; background:#f3f4f6 }
</style>