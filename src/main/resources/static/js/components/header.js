export const AppHeader = {
  template: `
  <div class="app-shell">
    <!-- sidebar reservado (espaço para navbar vertical) -->
    <aside class="container-sidebar">
      <div class="sidebar-logo">DRI'AH</div>
    </aside>

    <!-- área principal (todo o espaço à direita da sidebar) -->
    <div class="main-area">
      <!-- header (APENAS o que está acima da barra de pesquisa) -->
      <header class="page-header">
        <div class="header-left">
          <h1 class="header-title">Listagem de clientes</h1>
          <nav class="header-tabs">
            <button class="tab active">Listagem de clientes</button>
            <button class="tab">Lista de espera</button>
          </nav>
        </div>

        <div class="header-right">
          <div class="brand">DRI'AH</div>
          <div class="avatar"></div>
        </div>
      </header>

      <!-- barra de pesquisa — elemento SEPARADO do <header> -->
      <div class="search-bar">
        <label class="search-label">Pesquisar cliente:</label>
        <div class="search-controls">
          <input class="search-input" type="text" placeholder="Comece a digitar...">
          <button class="icon-btn search-btn" aria-label="Buscar">🔍</button>
          <button class="btn filter-btn">⚑ Mais filtros</button>
          <button class="btn add-btn">＋ Adicionar cliente</button>
        </div>
      </div>

      <!-- restante da página ficará aqui -->
      <section class="page-content">
        <!-- conteúdo da lista de clientes -->
      </section>
    </div>
  </div>
  `
};