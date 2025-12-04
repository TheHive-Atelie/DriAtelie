export const Servicos = {

  name: 'Servicos',
  data() {
    return {
      searchQuery: '',
      showModal: false,
      editingService: null,
      formData: {
        name: '',
        price: '',
        deadline: ''
      },
      services: []
    }
  },
  mounted() {
    this.fetchServices()
  },
  computed: {
    filteredServices() {
      if (!this.searchQuery) {
        return this.services
      }

      const query = this.searchQuery.toLowerCase()
      return this.services.filter(service =>
        service.name.toLowerCase().includes(query)
      )
    }
  },
  methods: {
    async fetchServices() {
      try {
        const res = await fetch('/servicos')
        if (!res.ok) throw new Error('Erro ao carregar serviços')
        const list = await res.json()
        this.services = list.map(s => ({
          id: s.id_servicos || s.id || s.idServicos,
          name: s.nomeTipoServico || s.name,
          price: s.preco || s.price,
          deadline: s.tempoEstimado || s.deadline,
          selected: false
        }))
      } catch (err) {
        console.error(err)
        this.services = []
      }
    },
    openAddModal() {
      this.editingService = null
      this.formData = {
        name: '',
        price: '',
        deadline: ''
      }
      this.showModal = true
    },

    openEditModal(service) {
      this.editingService = service
      this.formData = {
        name: service.name,
        price: service.price,
        deadline: service.deadline
      }
      this.showModal = true
    },

    closeModal() {
      this.showModal = false
      this.editingService = null
      this.formData = {
        name: '',
        price: '',
        deadline: ''
      }
    },

    async saveService() {
      const payload = {
        nomeTipoServico: this.formData.name,
        preco: Number(this.formData.price),
        tempoEstimado: Number(this.formData.deadline)
      }

      try {
        if (this.editingService && this.editingService.id) {
          const res = await fetch(`/servicos/${this.editingService.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })
          if (!res.ok) throw new Error('Erro ao atualizar serviço')
        } else {
          const res = await fetch('/servicos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })
          if (!res.ok) throw new Error('Erro ao criar serviço')
        }

        await this.fetchServices()
        this.closeModal()
      } catch (err) {
        console.error(err)
        alert('Erro ao salvar serviço: ' + err.message)
      }
    },

    async deleteService(id) {
      if (!confirm('Tem certeza que deseja deletar este serviço?')) return
      try {
        const res = await fetch(`/servicos/${id}`, { method: 'DELETE' })
        if (!res.ok) throw new Error('Erro ao deletar serviço')
        this.services = this.services.filter(service => service.id !== id)
      } catch (err) {
        console.error(err)
        alert('Erro ao deletar serviço: ' + err.message)
      }
    }
  },
  template: `
  <div>
  <div class="services-crud">
    <!-- Cabeçalho -->
    <div class="header page-header">
      <h1>Listagem de serviços</h1>
      <div class="subtitle">Lista de serviços disponíveis</div>
    </div>

    <!-- Barra de pesquisa e ações -->
    <div class="actions-bar">
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Pesquisar serviços..." 
          class="search-input"
        />
        <button class="search-btn">Q</button>
      </div>
      <button class="add-btn" @click="openAddModal">
        Adicionar serviço
      </button>
    </div>

    <!-- Lista de serviços -->
      <div class="list-header">
        <div class="checkbox-column"></div>
        <div class="name-column">Nome do serviço</div>
        <div class="price-column">Preço</div>
        <div class="deadline-column">Prazo limite</div>
        <div class="actions-column">Ações</div>
      </div>

      <div 
        v-for="service in filteredServices" 
        :key="service.id" 
        class="service-item"
      >
        <div class="checkbox-column">
          <input type="checkbox" v-model="service.selected" />
        </div>
        <div class="name-column">{{ service.name }}</div>
        <div class="price-column">R$ {{ service.price }}</div>
        <div class="deadline-column">{{ service.deadline }} dias</div>
        <div class="actions-column">
          <button class="edit-btn" @click="openEditModal(service)">
            Editar
          </button>
          <button class="delete-btn" @click="deleteService(service.id)">
            Deletar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para adicionar/editar serviço -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>{{ editingService ? 'Editar Serviço' : 'Adicionar Serviço' }}</h2>
        
        <form @submit.prevent="saveService">
          <div class="form-group">
            <label for="serviceName">Nome do serviço:</label>
            <input
              id="serviceName"
              type="text"
              v-model="formData.name"
              required
              placeholder="Digite o nome do serviço"
            />
          </div>

          <div class="form-group">
            <label for="servicePrice">Preço (R$):</label>
            <input
              id="servicePrice"
              type="number"
              step="0.01"
              v-model="formData.price"
              required
              placeholder="0.00"
              min="0"
            />
          </div>

          <div class="form-group">
            <label for="serviceDeadline">Prazo limite (dias):</label>
            <input
              id="serviceDeadline"
              type="number"
              v-model="formData.deadline"
              required
              placeholder="0"
              min="1"
            />
          </div>

          <div class="modal-actions">
            <button type="button" class="cancel-btn" @click="closeModal">
              Cancelar
            </button>
            <button type="submit" class="save-btn">
              {{ editingService ? 'Atualizar' : 'Salvar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
  `
};


