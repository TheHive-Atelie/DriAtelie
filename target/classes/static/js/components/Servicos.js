export const Servicos = {
  template: `
    <div class="main-area">
      <header class="page-header">
        <div class="header-left">
          <h1 class="header-title">Serviços</h1>
        </div>
        <div class="header-right">
          <div class="brand">DRI'AH</div>
          <div class="avatar"></div>
        </div>
      </header>
       <div class="search-bar">
        <label class="search-label">Pesquisar cliente:</label>
        <div class="search-controls">
          <div class="left-group">
            <input class="search-input" type="text" placeholder="Comece a digitar...">
            <button class="icon-btn search-btn" aria-label="Buscar"><i class="fa fa-search"></i></button>
          </div>

          <div class="right-group">
            <button class="btn filter-btn"><i class="fa fa-filter"></i>&nbsp;Mais filtros</button>
            <button class="btn add-btn" @click="openAdd"><i class="fa fa-plus"></i>&nbsp;Adicionar cliente</button>
          </div>
        </div>
      </div>
      <section class="page-content">
        <p>Página de Serviços</p>
      </section>

      <section id="tabela-servicos">
      
      </section>

     

    </div>
  `
};
