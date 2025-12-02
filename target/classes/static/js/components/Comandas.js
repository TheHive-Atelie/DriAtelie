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
        const d = new Date(isoDateStr)
        if (isNaN(d)) return isoDateStr
        return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })
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
    <div class="main-area">
      <header class="page-header">
        <div class="header-left">
          <h1 class="header-title">Comandas</h1>
        </div>
        <div class="header-right">
          <div class="brand">DRI'AH</div>
          <div class="avatar"></div>
        </div>
      </header>

      <section class="page-content">
        <div class="comandas-header">
          <div class="search-area">
            <input type="text" v-model="searchQuery" placeholder="Código/Cliente/Serviço..." class="search-input"/>
            <button class="search-btn">🔍</button>
            <button class="filter-btn">⚙️ Filtros</button>
          </div>
          <div class="actions">
            <button class="create-btn" @click.prevent="onCreate">+ Criar nova comanda</button>
          </div>
        </div>

        <div class="table-container">
          <div v-if="loading">Carregando ordens de serviço...</div>
          <div v-if="error" class="error">Erro: {{ error }}</div>

          <table v-if="!loading && !error" class="comandas-table">
            <thead>
              <tr>
                <th>Id Comanda</th>
                <th>Id Cliente</th>
                <th>Data</th>
                <th>Valor Total</th>
                <th>Operações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td>#{{ String(order.id).padStart(3, '0') }}</td>
                <td>#{{ order.clienteId ? String(order.clienteId).padStart(3, '0') : '-' }}</td>
                <td>{{ formatDate(order.data) }}</td>
                <td>{{ formatCurrency(order.valorTotal) }}</td>
                <td>
                  <button class="view-btn" @click.prevent="onView(order)">Ver</button>
                  <button class="remove-btn" @click.prevent="onDelete(order)">Remover</button>
                </td>
              </tr>
              <tr v-if="orders.length === 0">
                <td colspan="5" class="empty">Nenhuma ordem de serviço encontrada.</td>
              </tr>
            </tbody>
          </table>
        </div>

      </section>
    </div>
  `
};
