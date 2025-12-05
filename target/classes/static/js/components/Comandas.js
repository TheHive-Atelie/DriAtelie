export const Comandas = {
  name: 'Comandas',
  data() {
    return {
      searchQuery: '',
      orders: [],
      loading: false,
      error: null
    }
  },
  computed: {
    filteredOrders() {
      if (!this.searchQuery) return this.orders;
      const query = this.searchQuery.toLowerCase();
      return this.orders.filter(order => 
        String(order.id).includes(query) ||
        String(order.clienteId).includes(query) ||
        String(order.servicoId).includes(query) ||
        (order.clienteNome && order.clienteNome.toLowerCase().includes(query))
      );
    }
  },
  methods: {
    async fetchOrders() {
      this.loading = true
      this.error = null
      try {
        const res = await fetch('/os')
        if (!res.ok) throw new Error('Falha ao buscar ordens: ' + res.status)
        const data = await res.json()
        this.orders = Array.isArray(data) ? data : []
      } catch (err) {
        console.error(err)
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    formatDate(isoDateStr) {
      if (!isoDateStr) return ''
      try {
        // Parse YYYY-MM-DD directly to avoid timezone issues
        const parts = String(isoDateStr).split('-')
        if (parts.length === 3) {
          const year = parseInt(parts[0])
          const month = parseInt(parts[1])
          const day = parseInt(parts[2])
          return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`
        }
        return isoDateStr
      } catch (e) {
        return isoDateStr
      }
    },

    formatCurrency(val) {
      if (val === null || val === undefined) return ''
      try {
        return Number(val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      } catch (e) {
        return val
      }
    },

    onCreate() {
      alert('Criar nova comanda: não implementado ainda')
    },

    onView(order) {
      alert('Ver comanda: não implementado ainda (id ' + order.id + ')')
    },

    onDelete(order) {
      alert('Remover comanda: não implementado ainda (id ' + order.id + ')')
    }
  },

  mounted() {
    this.fetchOrders()
  },

  template: `
    <div class="main-area page-content">
      <div class="comandas-crud">
        <header class="page-header header">
          <div class="header page-header">
            <h1>Listagem de Ordens de Serviço</h1>
            <div class="subtitle">Ordens de serviço cadastradas no sistema</div>
          </div>
          <div class="header-right">
            <div class="brand">DRI'AH</div>
            <div class="avatar"></div>
          </div>
        </header>

        <section class="page-content">
          <div class="actions-bar">
            <div class="search-container">
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Pesquisar por ID, cliente ou serviço..." 
                class="search-input"
              />
              <button class="search-btn">Q</button>
            </div>
            <button class="add-btn" @click="onCreate">
              Adicionar Comanda
            </button>
          </div>

          <div class="comandas-table">
            <div v-if="loading" class="loading-message">Carregando ordens de serviço...</div>
            <div v-else-if="error" class="error-message">Erro: {{ error }}</div>
            <div v-else-if="orders.length === 0" class="empty-message">Nenhuma ordem de serviço encontrada.</div>
            <div v-else class="services-table">
              <div class="list-header">
                <div class="id-column header-cell">ID O.S.</div>
                <div class="id-column header-cell">ID Cliente</div>
                <div class="name-column header-cell">Cliente</div>
                <div class="id-column header-cell">ID Serviço</div>
                <div class="name-column header-cell">Serviço</div>
                <div class="date-column header-cell">Data</div>
                <div class="time-column header-cell">Tempo Est.</div>
                <div class="value-column header-cell">Valor Total</div>
                <div class="value-column header-cell">Sinal</div>
                <div class="status-column header-cell">Pagamento</div>
                <div class="actions-column header-cell">Ações</div>
              </div>

              <div 
                v-for="order in filteredOrders" 
                :key="order.id" 
                class="order-item table-row">
                <div class="id-column cell">#{{ String(order.id).padStart(3, '0') }}</div>
                <div class="id-column cell">#{{ order.clienteId ? String(order.clienteId).padStart(3, '0') : '-' }}</div>
                <div class="name-column cell">{{ order.clienteNome || '-' }}</div>
                <div class="id-column cell">#{{ order.servicoId ? String(order.servicoId).padStart(3, '0') : '-' }}</div>
                <div class="name-column cell">{{ order.servicoNome || '-' }}</div>
                <div class="date-column cell">{{ formatDate(order.data) }}</div>
                <div class="time-column cell">{{ order.tempoEstimadoDias ? order.tempoEstimadoDias + ' d' : '-' }}</div>
                <div class="value-column cell">{{ formatCurrency(order.valorTotal) }}</div>
                <div class="value-column cell">{{ formatCurrency(order.sinal) }}</div>
                <div class="status-column cell">{{ order.tipoPagamento || '-' }}</div>
                <div class="actions-column actions cell">
                  <button class="view-btn action-btn" @click="onView(order)">Ver</button>
                  <button class="delete-btn action-btn" @click="onDelete(order)">Remover</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `
};
