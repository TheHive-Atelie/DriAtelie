export const Clientes = {
  template: `
    <div class="main-area">
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

      <div class="search-bar">
        <label class="search-label">Pesquisar cliente:</label>
        <div class="search-controls">
          <div class="left-group">
            <input class="search-input" type="text" placeholder="Comece a digitar...">
            <button class="icon-btn search-btn" aria-label="Buscar"><i class="fa fa-search"></i></button>
          </div>

          <!-- right-group empurra os botões para o fim da linha -->
          <div class="right-group">
            <button class="btn filter-btn"><i class="fa fa-filter"></i>&nbsp;Mais filtros</button>
            <button class="btn add-btn"><i class="fa fa-plus"></i>&nbsp;Adicionar cliente</button>
          </div>
        </div>
      </div>

      <section class="page-content">
        <div class="clients-table">
          <div class="table-header">
            <div class="checkbox-cell">
              <input type="checkbox" aria-label="Selecionar todos">
            </div>
            <div class="header-cell">Nome do cliente</div>
            <div class="header-cell">Telefone</div>
            <div class="header-cell">Email</div>
            <div class="header-cell">Ordem de Serviço</div>
            <div class="header-cell actions-cell">Ações</div>
          </div>

          <!-- Linha de exemplo - repetir conforme dados -->
          <div class="table-row">
            <div class="checkbox-cell">
              <input type="checkbox">
            </div>
            <div class="cell client-info">
              <div class="client-name">Nome/Sobrenome</div>
              <div class="client-id">#123</div> <!-- ID exibido abaixo do nome -->
            </div>
            <div class="cell">99 99999-9999</div>
            <div class="cell">email@email.com</div>
            <div class="cell"> 
              <button class="service-list-btn">Lista de serviços</button>
            </div>
            <div class="cell actions-cell">
              <div class="actions">
                <button class="action-btn edit" title="Editar"><i class="fa fa-pen"></i></button>
                <button class="action-btn delete" title="Excluir"><i class="fa fa-trash"></i></button>
              </div>
            </div>
          </div>
          <!-- Repetir linhas conforme necessário -->
        </div>
      </section>
    </div>
  `
};
