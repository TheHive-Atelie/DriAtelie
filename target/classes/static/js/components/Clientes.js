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
      error: null
    };
  },
  mounted() {
    this.fetchClients();
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
            <input class="search-input" type="text" placeholder="Comece a digitar...">
            <button class="icon-btn search-btn" aria-label="Buscar"><i class="fa fa-search"></i></button>
          </div>

          <div class="right-group">
            <button class="btn filter-btn"><i class="fa fa-filter"></i>&nbsp;Mais filtros</button>
            <button class="btn add-btn" @click="openAdd"><i class="fa fa-plus"></i>&nbsp;Adicionar cliente</button>
          </div>
        </div>
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>

      <section class="page-content">
        <div v-if="loading" class="loading-message">Carregando clientes...</div>
        <div v-else-if="clients.length === 0" class="empty-message">Nenhum cliente encontrado</div>
        
        <div v-else class="clients-table">
          <div class="table-header">
            <div class="checkbox-cell"><input type="checkbox" aria-label="Selecionar todos"></div>
            <div class="header-cell">Nome do cliente</div>
            <div class="header-cell">Telefone</div>
            <div class="header-cell">Email</div>
            <div class="header-cell">Ordem de Serviço</div>
            <div class="header-cell actions-cell">Ações</div>
          </div>

          <div v-for="client in clients" :key="client.id" class="table-row">
            <div class="checkbox-cell"><input type="checkbox"></div>

            <div class="cell client-info">
              <div class="client-name">{{ client.nome }}</div>
              <div class="client-id">#{{ client.id }}</div>
            </div>

            <div class="cell">{{ client.telefone_cliente || '-' }}</div>
            <div class="cell">{{ client.email_cliente || '-' }}</div>
            <div class="cell">
              <button class="service-list-btn">Lista de serviços</button>
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
    </div>
  `
};