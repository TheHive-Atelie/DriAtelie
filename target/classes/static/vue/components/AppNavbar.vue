<template>
    <aside class="sidebar">
        <ul class="nav-list">
            <li><a href="#">🏠 Home</a></li>
            <li><a href="#">📋 Comandas</a></li>
            <li><a href="#">👪 Clientes</a></li>
            <li><a href="#">💰 Finanças</a></li>
        </ul>
    </aside>
</template>

<style scoped>
    .sidebar {
        width: 247px;
        background: #4C4C4C;
        color: white;
        height: 100vh;
        box-sizing: border-box;
        padding-top: 186px;
        display: flex;
        align-items: flex-start;
    }

    .nav-list {
        list-style: none;
        padding: 0;
        margin: 0;
        width: 100%;
    }

    .nav-list li { margin: 6px 0; }

    .nav-list li a {
        font-size: 24px;
        font-weight: 700;
        padding-bottom: 40px;
        padding-left: 60px;
        color: #e5e7eb;
        text-decoration: none;
        display: block;
    }

    .nav-list li a:hover { background: rgba(255,255,255,0.06); }
</style>