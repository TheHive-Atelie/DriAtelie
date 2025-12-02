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

    saveService() {
      if (this.editingService) {
        // Atualizar serviço existente
        const index = this.services.findIndex(s => s.id === this.editingService.id)
        if (index !== -1) {
          this.services[index] = {
            ...this.services[index],
            name: this.formData.name,
            price: this.formData.price,
            deadline: parseInt(this.formData.deadline)
          }
        }
      } else {
        // Adicionar novo serviço
        const newId = Math.max(...this.services.map(s => s.id), 0) + 1
        this.services.push({
          id: newId,
          name: this.formData.name,
          price: this.formData.price,
          deadline: parseInt(this.formData.deadline),
          selected: false
        })
      }

      this.closeModal()
    },

    deleteService(id) {
      if (confirm('Tem certeza que deseja deletar este serviço?')) {
        this.services = this.services.filter(service => service.id !== id)
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


