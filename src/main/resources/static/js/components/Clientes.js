export const Clientes = {
  data() {
    return {
      clients: [],
      modalOpen: false,
      modalMode: 'add',
      form: {
        id: null,
        nome: '',
        telefone_cliente: '',
        email_cliente: ''
      },
      deleteConfirmOpen: false,
      deleteConfirmId: null,
      loading: false,
      error: null,

      // Search and filters
      searchQuery: '',
      filtersOpen: false,
      filters: {
        id: '',
        nome: '',
        email: '',
        telefone: ''
      },

      // Serviços popups
      servicesModalOpen: false,
      servicesLoading: false,
      servicesError: null,
      selectedClient: null,
      ordens: [],
      osDetailModalOpen: false,
      selectedOS: null
    };
  },
  mounted() {
    this.fetchClients();
  },
  computed: {
    filteredClients() {
      const byName = (c) =>
        this.searchQuery
          ? String(c.nome || '').toLowerCase().includes(this.searchQuery.toLowerCase())
          : true;

      const byId = (c) =>
        this.filters.id !== ''
          ? String(c.id || '').includes(String(this.filters.id).trim())
          : true;

      const byNome = (c) =>
        this.filters.nome
          ? String(c.nome || '').toLowerCase().includes(this.filters.nome.toLowerCase())
          : true;

      const byEmail = (c) =>
        this.filters.email
          ? String(c.email_cliente || '').toLowerCase().includes(this.filters.email.toLowerCase())
          : true;

      const byTelefone = (c) =>
        this.filters.telefone
          ? String(c.telefone_cliente || '').toLowerCase().includes(this.filters.telefone.toLowerCase())
          : true;

      return this.clients.filter((c) => byName(c) && byId(c) && byNome(c) && byEmail(c) && byTelefone(c));
    }
  },
  methods: {
    async fetchClients() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('/clientes');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.clients = Array.isArray(data) ? data : (data.content || data.data || []);
      } catch (err) {
        this.error = 'Erro ao carregar clientes: ' + err.message;
      } finally {
        this.loading = false;
      }
    },
    openAdd() {
      this.modalMode = 'add';
      this.form = { id: null, nome: '', telefone_cliente: '', email_cliente: '' };
      this.modalOpen = true;
    },
    openEdit(client) {
      this.modalMode = 'edit';
      this.form = { 
        id: client.id, 
        nome: client.nome || '', 
        telefone_cliente: client.telefone_cliente || '', 
        email_cliente: client.email_cliente || '' 
      };
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    },
    formatPhone(value) {
      let v = value.replace(/\D/g, '');
      if (v.length <= 2) return v;
      if (v.length <= 7) return `${v.slice(0, 2)} ${v.slice(2)}`;
      return `${v.slice(0, 2)} ${v.slice(2, 7)}-${v.slice(7, 11)}`;
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString + 'T00:00:00');
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    async getServiceName(idServicos) {
      try {
        const response = await fetch(`/servicos/${idServicos}`);
        if (response.ok) {
          const data = await response.json();
          return data.nomeTipoServico || `Serviço #${idServicos}`;
        }
        return `Serviço #${idServicos}`;
      } catch (e) {
        return `Serviço #${idServicos}`;
      }
    },
    async saveClient() {
      this.error = null;
      try {
        const url = this.modalMode === 'add' ? '/clientes' : `/clientes/${this.form.id}`;
        const method = this.modalMode === 'add' ? 'POST' : 'PUT';

        const payload = {
          nome: this.form.nome,
          telefone_cliente: this.form.telefone_cliente,
          email_cliente: this.form.email_cliente
        };

        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error('Erro ao salvar cliente');
        }

        await this.fetchClients();
        this.closeModal();
      } catch (err) {
        this.error = 'Erro ao salvar cliente: ' + err.message;
      }
    },
    openDeleteConfirm(id) {
      this.deleteConfirmId = id;
      this.deleteConfirmOpen = true;
    },
    closeDeleteConfirm() {
      this.deleteConfirmOpen = false;
      this.deleteConfirmId = null;
    },
    async confirmDelete() {
      this.error = null;
      try {
        const response = await fetch(`/clientes/${this.deleteConfirmId}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Erro ao deletar cliente');
        }

        await this.fetchClients();
        this.closeDeleteConfirm();
      } catch (err) {
        this.error = 'Erro ao deletar cliente: ' + err.message;
      }
    },

    // Filters modal
    openFilters() {
      this.filtersOpen = true;
    },
    closeFilters() {
      this.filtersOpen = false;
    },
    applyFilters() {
      this.filtersOpen = false;
    },
    clearFilters() {
      this.filters = { id: '', nome: '', email: '', telefone: '' };
    },

    // Serviços modals
    async openServiceList(client) {
      this.selectedClient = client;
      this.servicesModalOpen = true;
      this.servicesLoading = true;
      this.servicesError = null;
      this.ordens = [];
      try {
        const resp = await fetch(`/os/cliente/${client.id}`);
        if (!resp.ok) throw new Error(`Erro ao carregar ordens de serviço: ${resp.status}`);
        const data = await resp.json();
        this.ordens = Array.isArray(data) ? data : [];

        // Buscar nome do serviço para cada ordem se não vier no relacionamento
        for (let os of this.ordens) {
          if (!os.servico && os.servico?.id_servicos) {
            os.nomeTipoServico = await this.getServiceName(os.servico.id_servicos);
          } else if (os.servico) {
            os.nomeTipoServico = os.servico.nomeTipoServico;
          }
        }
      } catch (e) {
        this.servicesError = e.message;
      } finally {
        this.servicesLoading = false;
      }
    },
    closeServiceList() {
      this.servicesModalOpen = false;
      this.selectedClient = null;
      this.ordens = [];
      this.servicesError = null;
    },
    async openOSDetail(os) {
      this.selectedOS = os;
      // Buscar nome do serviço se não tiver no relacionamento
      if (!os.servico || !os.servico.nomeTipoServico) {
        if (os.servico?.id_servicos) {
          os.nomeTipoServico = await this.getServiceName(os.servico.id_servicos);
        }
      } else {
        os.nomeTipoServico = os.servico.nomeTipoServico;
      }
      this.osDetailModalOpen = true;
    },
    closeOSDetail() {
      this.osDetailModalOpen = false;
      this.selectedOS = null;
    }
  },
  
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
            <input class="search-input" v-model="searchQuery" type="text" placeholder="Comece a digitar...">
            <button class="icon-btn search-btn" aria-label="Buscar"><i class="fa fa-search"></i></button>
          </div>

          <div class="right-group">
            <button class="btn filter-btn" @click="openFilters"><i class="fa fa-filter"></i>&nbsp;Mais filtros</button>
            <button class="btn add-btn" @click="openAdd"><i class="fa fa-plus"></i>&nbsp;Adicionar cliente</button>
          </div>
        </div>
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>

      <section class="page-content">
        <div v-if="loading" class="loading-message">Carregando clientes...</div>
        <div v-else-if="filteredClients.length === 0" class="empty-message">Nenhum cliente encontrado</div>
        
        <div v-else class="clients-table">
          <div class="table-header">
            <div class="checkbox-cell"><input type="checkbox" aria-label="Selecionar todos"></div>
            <div class="header-cell">Nome do cliente</div>
            <div class="header-cell">Telefone</div>
            <div class="header-cell">Email</div>
            <div class="header-cell">Ordem de Serviço</div>
            <div class="header-cell actions-cell">Ações</div>
          </div>

          <div v-for="client in filteredClients" :key="client.id" class="table-row">
            <div class="checkbox-cell"><input type="checkbox"></div>

            <div class="cell client-info">
              <div class="client-name">{{ client.nome }}</div>
              <div class="client-id">#{{ client.id }}</div>
            </div>

            <div class="cell">{{ client.telefone_cliente || '-' }}</div>
            <div class="cell">{{ client.email_cliente || '-' }}</div>
            <div class="cell">
              <button class="service-list-btn" @click="openServiceList(client)">Lista de serviços</button>
            </div>

            <div class="cell actions-cell">
              <div class="actions">
                <button class="action-btn edit" @click="openEdit(client)" title="Editar"><i class="fa fa-pen"></i></button>
                <button class="action-btn delete" @click="openDeleteConfirm(client.id)" title="Excluir"><i class="fa fa-trash"></i></button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div v-if="modalOpen" class="modal-backdrop" @click.self="closeModal">
        <div class="modal">
          <h2 class="modal-title" v-if="modalMode==='add'">Adicionar Cliente</h2>
          <h2 class="modal-title" v-else>Editar Cliente</h2>

          <label class="modal-label">Nome:</label>
          <input class="modal-input" v-model="form.nome" type="text" placeholder="Nome/Sobrenome">

          <label class="modal-label">Telefone:</label>
          <input class="modal-input" v-model="form.telefone_cliente" @input="form.telefone_cliente = formatPhone(form.telefone_cliente)" type="text" placeholder="99 99999-9999" maxlength="14">

          <label class="modal-label">Email:</label>
          <input class="modal-input" v-model="form.email_cliente" type="email" placeholder="email@email.com">

          <div class="modal-actions">
            <button class="btn add-btn" @click="saveClient">{{ modalMode==='add' ? 'Adicionar' : 'Salvar' }}</button>
            <button class="btn cancel-btn" @click="closeModal">Cancelar</button>
          </div>
        </div>
      </div>

      <div v-if="deleteConfirmOpen" class="modal-backdrop" @click.self="closeDeleteConfirm">
        <div class="modal delete-confirm-modal">
          <h2 class="modal-title delete-title">Excluir Cliente</h2>
          <p class="delete-message">Tem certeza que deseja excluir este cliente?</p>

          <div class="modal-actions">
            <button class="btn cancel-btn" @click="closeDeleteConfirm">Cancelar</button>
            <button class="btn delete-confirm-btn" @click="confirmDelete">Excluir</button>
          </div>
        </div>
      </div>

      <!-- Modal de Filtros -->
      <div v-if="filtersOpen" class="modal-backdrop" @click.self="closeFilters">
        <div class="modal">
          <h2 class="modal-title">Filtros de Pesquisa</h2>

          <label class="modal-label">ID:</label>
          <input class="modal-input" v-model="filters.id" type="text" placeholder="ID do cliente">

          <label class="modal-label">Nome:</label>
          <input class="modal-input" v-model="filters.nome" type="text" placeholder="Nome">

          <label class="modal-label">Email:</label>
          <input class="modal-input" v-model="filters.email" type="email" placeholder="Email">

          <label class="modal-label">Telefone:</label>
          <input class="modal-input" v-model="filters.telefone" type="text" placeholder="Telefone">

          <div class="modal-actions">
            <button class="btn add-btn" @click="applyFilters">Aplicar</button>
            <button class="btn cancel-btn" @click="clearFilters">Limpar</button>
            <button class="btn cancel-btn" @click="closeFilters">Fechar</button>
          </div>
        </div>
      </div>

      <!-- Modal de Lista de Serviços -->
      <div v-if="servicesModalOpen" class="modal-backdrop" @click.self="closeServiceList">
        <div class="modal">
          <h2 class="modal-title">Ordens de Serviço - {{ selectedClient?.nome }}</h2>

          <div v-if="servicesLoading" class="loading-message">Carregando serviços...</div>
          <div v-else-if="servicesError" class="error-message">{{ servicesError }}</div>
          <div v-else-if="ordens.length === 0" class="empty-message">Nenhuma ordem de serviço encontrada</div>

          <div v-else class="services-list">
            <div v-for="os in ordens" :key="os.id" class="service-item" @click="openOSDetail(os)">
              <div class="service-header">
                <span class="service-id">OS #{{ os.id }}</span>
                <span class="service-name">{{ os.servico?.nomeTipoServico || 'Sem nome' }}</span>
              </div>
              <div class="service-status">{{ os.status || 'Pendente' }}</div>
            </div>
          </div>

          <div class="modal-actions">
            <button class="btn cancel-btn" @click="closeServiceList">Fechar</button>
          </div>
        </div>
      </div>

      <!-- Modal de Detalhes da Ordem de Serviço -->
      <div v-if="osDetailModalOpen" class="modal-backdrop" @click.self="closeOSDetail">
        <div class="modal">
          <h2 class="modal-title">Detalhes da Ordem de Serviço</h2>

          <div v-if="selectedOS" class="os-details">
            <p><strong>ID:</strong> {{ selectedOS.id }}</p>
            <p><strong>Serviço:</strong> {{ selectedOS.servico?.nomeTipoServico || selectedOS.nomeTipoServico || 'Sem nome' }}</p>
            <p><strong>Status:</strong> {{ selectedOS.status || 'Pendente' }}</p>
            <p v-if="selectedOS.dataEntrada"><strong>Data de Entrada:</strong> {{ formatDate(selectedOS.dataEntrada) }}</p>
            <p v-if="selectedOS.dataSaida"><strong>Data de Saída:</strong> {{ formatDate(selectedOS.dataSaida) }}</p>
            <p v-if="selectedOS.descricao"><strong>Descrição:</strong> {{ selectedOS.descricao }}</p>
          </div>

          <div class="modal-actions">
            <button class="btn cancel-btn" @click="closeOSDetail">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  `
};